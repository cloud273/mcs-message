import { EntityRepository, EntityManager, InsertResult } from "typeorm";
import { Sms } from "../entity/Sms";
import { Cond } from "../../node/library/sql/Cond";
import { Where } from "../../node/library/sql/Where";

@EntityRepository()
export class SmsRepository {

    constructor(private manager: EntityManager) {

    }

    public async insert(phone: string, message: string, type: string, accountId: number): Promise<InsertResult> {
        const obj = new Sms(phone, message, type, accountId)
        return this.manager.createQueryBuilder()
        .insert()
        .into(Sms)
        .values(obj)
        .execute()
    }

    public async gets(type: string, phone: string,  accountId: number): Promise<Sms[]> {   
        const conds = [Cond.equal("accountId", accountId)]
        if (type != null) {
            conds.push(Cond.equal("type", type))
        }
        if (phone != null) {
            conds.push(Cond.equal("phone", phone))
        }
        
        return this.manager.createQueryBuilder(Sms, "t")
        .select(Sms.basic("t"))
        .where(Where.and(conds, "t"))
        .orderBy({
            "t.id": "DESC"
        })
        .getMany()
    }

    public async get(id: number, accountId: number): Promise<Sms> {   
        return this.manager.createQueryBuilder(Sms, "t")
        .select(Sms.detail("t"))
        .where(Where.and([
            Cond.equal("id", id), 
            Cond.equal("accountId", accountId)
        ], "t"))
        .getOne()
    }

}