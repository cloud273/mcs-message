import { EntityRepository, EntityManager, InsertResult} from "typeorm";
import { Account } from "../entity/Account";
import { Where } from "../../node/library/sql/Where";
import { Cond } from "../../node/library/sql/Cond";

@EntityRepository()
export class AccountRepository {

    constructor(private manager: EntityManager) {

    }

    public async insert(email: string): Promise<InsertResult> {
        const obj = new Account(email, String.random())
        return this.manager.createQueryBuilder()
        .insert()
        .into(Account)
        .values(obj)
        .execute()
    }

    public async getId(token: string): Promise<number> {   
        const acc = await this.manager.createQueryBuilder(Account, "t")
        .select(Account.id("t"))
        .where(Where.and([Cond.equal("token", token)], "t"))
        .getOne()
        if (acc != null) {
            return acc.id
        } 
        return null
    }

    public async isExisted(username: string): Promise<boolean> {   
        return await this.manager.createQueryBuilder(Account, "t")
        .where(Where.and([Cond.equal("username", username)], "t"))
        .getCount() > 0
    }

}