import { getCustomRepository } from "typeorm";
import { Result } from "../common/Result";
import { AccountService } from "./AccountService";
import { FcmProviderRepository } from "../repository/FcmProviderRepository";
import { FcmManager } from "../lib/fcm/FcmManager";
import { FcmMessageRepository } from "../repository/FcmMessageRepository";
import { Sql } from "../../node/library/sql/Sql";

export class FcmService {

    static async create(type: string, devices: string[], title: string, body: string, icon: string, sound: string, tag: string, projectId: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const provider = await getCustomRepository(FcmProviderRepository).get(projectId, accountId)
            if (provider == null) {
                result = Result.forbidden()
            } else {
                const aModule = FcmManager.get(provider.projectId, provider.clientEmail, provider.privateKey)
                await aModule.send(devices, title, body, icon, sound, tag)
                .then (async obj => {
                    await getCustomRepository(FcmMessageRepository).insert(type, devices, title, body, icon, sound, tag, provider.id)
                    .then(obj => {
                        result = Result.init(Sql.insert(obj))
                    })
                    .catch(err => {
                        result = Result.init(Sql.error(err))
                    })
                })
                .catch(err => {
                    result = Result.serviceUnAvailable(err)
                })
            }          
        }
        return result
    }

    static async gets(projectId: string, type: string, device: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const providerId = await getCustomRepository(FcmProviderRepository).getId(projectId, accountId)
            if (providerId == null) {
                result = Result.forbidden()
            } else {
                const objs = await getCustomRepository(FcmMessageRepository).gets(type, device, providerId)
                result = Result.success(objs) 
            }   
        }
        return result
    }

    static async get(id: number, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const sms = await getCustomRepository(FcmMessageRepository).get(id, accountId)
            if (sms == null) {
                result = Result.notFound()
            } else {
                result = Result.success(sms) 
            } 
        }
        return result
    }

}