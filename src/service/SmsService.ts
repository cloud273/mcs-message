import { GsmModule } from "../lib/gsm/GsmModule";
import { getCustomRepository } from "typeorm";
import { SmsRepository } from "../repository/SmsRepository";
import { Result } from "../common/Result";
import { AccountService } from "./AccountService";
import { Sql } from "../../node/library/sql/Sql";

export class SmsService {

    static async create(phone: string, message: string, type: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            if (await GsmModule.instance.sendSMS(phone, message)) {
                await getCustomRepository(SmsRepository).insert(phone, message, type, accountId)
                .then(obj => {
                    result = Result.init(Sql.insert(obj))
                })
                .catch(err => {
                    result = Result.init(Sql.error(err))
                })
            } else {
                result = Result.serviceUnAvailable()
            }           
        }
        return result
    }

    static async gets(type: string, phone: string, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const smses = await getCustomRepository(SmsRepository).gets(type, phone, accountId)
            result = Result.success(smses)          
        }
        return result
    }

    static async get(id: number, token: string): Promise<Result> {
        let result: Result
        let accountId = await AccountService.getId(token)
        if (accountId == null) {
            result = Result.unAuthorized()
        } else {
            const sms = await getCustomRepository(SmsRepository).get(id, accountId)
            if (sms == null) {
                result = Result.notFound()
            } else {
                result = Result.success(sms) 
            }    
        }
        return result
    }

}