import { getCustomRepository } from "typeorm";
import { Result } from "../common/Result";
import { AccountRepository } from "../repository/AccountRepository";
import { Constant } from "../../Constant";
import { EmailManager } from "../lib/email/EmailManager";
import { Sql } from "../../node/library/sql/Sql";

export class AccountService {

    static root = EmailManager.get(Constant.rootEmail.host, Constant.rootEmail.sender, Constant.rootEmail.password, Constant.rootEmail.port, Constant.rootEmail.secure)

    static async create(email: string): Promise<Result> {
        let result: Result
        const repository = getCustomRepository(AccountRepository)
        if (await repository.isExisted(email)) {
            result = Result.forbidden()
        } else {
            await this.root.send(email, Constant.welcomeEmail.subject, Constant.welcomeEmail.message)
            .then (async () => {
                await repository.insert(email)
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
        return result
    }

    static async getId(token: string): Promise<number> {
        return getCustomRepository(AccountRepository).getId(token)
    }

}