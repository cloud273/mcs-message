import { getCustomRepository } from "typeorm";
import { Result } from "../common/Result";
import { AccountService } from "./AccountService";
import { ApnsProviderRepository } from "../repository/ApnsProviderRepository";
import { ApnsMessageRepository } from "../repository/ApnsMessageRepository";
import { ApnsManager } from "../lib/apns/ApnsManager";
import { Sql } from "../../node/library/sql/Sql";

export class ApnsService {

    static async create(appBundle: string, type: string, devices: string[], title: string, body: string, payload: any, badge: number, sound: string, isProduction: boolean, projectId: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const provider = await getCustomRepository(ApnsProviderRepository).get(projectId, accountId)
            if (provider == null) {
                result = Result.forbidden()
            } else {
                const aModule = ApnsManager.get(provider.key, provider.keyId, provider.teamId, isProduction)
                await aModule.send(appBundle, devices, title, body, payload, badge, sound)
                .then (async obj => {
                    if (obj.failed.length == 0) {
                        await getCustomRepository(ApnsMessageRepository).insert(appBundle, type, devices, title, body, payload, badge, sound, isProduction, provider.id)
                        .then(obj => {
                            result = Result.init(Sql.insert(obj))
                        })
                        .catch(err => {
                            result = Result.init(Sql.error(err))
                        })
                    } else {
                        result = Result.init(obj.failed[0].status)
                    }
                })
                .catch(err => {
                    result = Result.serviceUnAvailable(err)
                })
            }          
        }
        return result
    }

    static async gets(projectId: string, appBundle: string, type: string, device: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const providerId = await getCustomRepository(ApnsProviderRepository).getId(projectId, accountId)
            if (providerId == null) {
                result = Result.forbidden()
            } else {
                const objs = await getCustomRepository(ApnsMessageRepository).gets(appBundle, type, device, providerId)
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
            const sms = await getCustomRepository(ApnsMessageRepository).get(id, accountId)
            if (sms == null) {
                result = Result.notFound()
            } else {
                result = Result.success(sms) 
            } 
        }
        return result
    }

}