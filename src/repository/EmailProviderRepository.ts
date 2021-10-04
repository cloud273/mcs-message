import { EntityRepository, EntityManager, InsertResult } from "typeorm";
import { EmailProvider } from "../entity/EmailProvider";
import { Where } from "../../node/library/sql/Where";
import { Cond } from "../../node/library/sql/Cond";

@EntityRepository()
export class EmailProviderRepository {

    constructor(private manager: EntityManager) {

    }

    public async insert(host: string, sender: string, password: string, port: number, secure: boolean, accountId: number): Promise<InsertResult> {
        const obj = new EmailProvider(host, sender, password, port, secure, accountId)
        return this.manager.createQueryBuilder()
        .insert()
        .into(EmailProvider)
        .values(obj)
        .execute()
    }

    public async get(sender: string, accountId: number): Promise<EmailProvider> {   
        return this.manager.createQueryBuilder(EmailProvider, "t")
        .select(EmailProvider.detail("t"))
        .where(Where.and([
            Cond.equal("sender", sender), 
            Cond.equal("accountId", accountId)
        ], "t"))
        .getOne()
    }

    public async getId(sender: string, accountId: number): Promise<number> {   
        const obj = await this.manager.createQueryBuilder(EmailProvider, "t")
        .select(EmailProvider.id("t"))
        .where(Where.and([
            Cond.equal("sender", sender), 
            Cond.equal("accountId", accountId)
        ], "t"))
        .getOne()
        if (obj != null) {
            return obj.id
        } else {
            return null
        }
    }

    public async isExisted(sender: string, accountId: number): Promise<boolean> {   
        return await this.manager.createQueryBuilder(EmailProvider, "t")
        .where(Where.and([
            Cond.equal("sender", sender), 
            Cond.equal("accountId", accountId)
        ], "t"))
        .getCount() > 0
    }

    public async count(accountId: number): Promise<number> {   
        return this.manager.createQueryBuilder(EmailProvider, "t")
        .where(Where.and([Cond.equal("accountId", accountId)], "t"))
        .getCount()
    }

}