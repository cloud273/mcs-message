import { getCustomRepository } from "typeorm";
import { Result } from "../common/Result";
import { Constant } from "../../Constant";
import { EmailProviderRepository } from "../repository/EmailProviderRepository";
import { ApnsProviderRepository } from "../repository/ApnsProviderRepository";
import { EmailManager } from "../lib/email/EmailManager";
import { FcmProviderRepository } from "../repository/FcmProviderRepository";
import { AccountService } from "./AccountService";
import { Sql } from "../../node/library/sql/Sql";

export class ProviderService {

    static async createEmailProvider(host: string, sender: string, password: string, port: number, secure: boolean, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const repository = getCustomRepository(EmailProviderRepository)
            const count = await repository.count(accountId)
            if (count > Constant.provider.maxEmail) {
                result = Result.expectationFailed()
            } else {
                if (await repository.isExisted(sender, accountId)) {
                    result = Result.forbidden()
                } else {
                    const emailModule = EmailManager.get(host, sender, password, port, secure)
                    await emailModule.send(sender, Constant.verifyEmail.subject, Constant.verifyEmail.message)
                    .then (async () => {
                        await repository.insert(host, sender, password, port, secure, accountId)
                        .then(obj => {
                            result = Result.init(Sql.insert(obj))
                        })
                        .catch(err => {
                            result = Result.init(Sql.error(err))
                        })
                    })
                    .catch(err => {
                        result = Result.notAcceptable(err)
                    }) 
                }
            }  
        }
        return result
    }

    static async getEmailProvider(sender: string,token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const provider = await getCustomRepository(EmailProviderRepository).get(sender, accountId)
            if (provider == null) {
                result = Result.notFound()
            } else {
                result = Result.success(provider)
            }
        }
        return result
    }

    static async createApnsProvider(projectId: string, key: string, keyId: string, teamId: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const repository = getCustomRepository(ApnsProviderRepository)
            const count = await repository.count(accountId)
            if (count > Constant.provider.maxApns) {
                result = Result.expectationFailed()
            } else {
                await repository.insert(projectId, key, keyId, teamId, accountId)
                .then(obj => {
                    result = Result.init(Sql.insert(obj))
                })
                .catch(err => {
                    result = Result.init(Sql.error(err))
                })
            }  
        }
        return result
    }

    static async getApnsProvider(sender: string,token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const provider = await getCustomRepository(ApnsProviderRepository).get(sender, accountId)
            if (provider == null) {
                result = Result.notFound()
            } else {
                result = Result.success(provider)
            }
        }
        return result
    }
    
    static async createFcmProvider(projectId: string, clientEmail: string, privateKey: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const repository = getCustomRepository(FcmProviderRepository)
            const count = await repository.count(accountId)
            if (count > Constant.provider.maxFcm) {
                result = Result.expectationFailed()
            } else {
                await repository.insert(projectId, clientEmail, privateKey, accountId)
                .then(obj => {
                    result = Result.init(Sql.insert(obj))
                })
                .catch(err => {
                    result = Result.init(Sql.error(err))
                })
            }  
        }
        return result
    }

    static async getFcmProvider(sender: string,token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const provider = await getCustomRepository(FcmProviderRepository).get(sender, accountId)
            if (provider == null) {
                result = Result.notFound()
            } else {
                result = Result.success(provider)
            }
        }
        return result
    }

}