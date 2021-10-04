import { getCustomRepository } from "typeorm";
import { Result } from "../common/Result";
import { AccountService } from "./AccountService";
import { EmailMessageRepository } from "../repository/EmailMessageRepository";
import { EmailProviderRepository } from "../repository/EmailProviderRepository";
import { EmailManager } from "../lib/email/EmailManager";
import { Sql } from "../../node/library/sql/Sql";

export class EmailService {

    static async create(to: string, subject: string, message: string, type: string, sender: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const provider = await getCustomRepository(EmailProviderRepository).get(sender, accountId)
            if (provider == null) {
                result = Result.forbidden()
            } else {
                const aModule = EmailManager.get(provider.host, provider.sender, provider.password, provider.port, provider.secure)
                await aModule.send(to, subject, message)
                .then (async obj => {
                    await getCustomRepository(EmailMessageRepository).insert(to, subject, message, type, provider.id)
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

    static async gets(type: string, to: string, sender: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            if (sender != null) {
                const providerId = await getCustomRepository(EmailProviderRepository).getId(sender, accountId)
                if (providerId == null) {
                    result = Result.forbidden()
                } else {
                    const smses = await getCustomRepository(EmailMessageRepository).gets(type, to, providerId)
                    result = Result.success(smses) 
                } 
            } else {
                const objs = await getCustomRepository(EmailMessageRepository).gets(type, to, null)
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
            const obj = await getCustomRepository(EmailMessageRepository).get(id, accountId)
            if (obj == null) {
                result = Result.notFound()
            } else {
                result = Result.success(obj) 
            } 
        }
        return result
    }

}