import { EntityRepository, EntityManager, InsertResult } from "typeorm";
import { Email } from "../entity/Email";
import { Cond } from "../../node/library/sql/Cond";
import { Where } from "../../node/library/sql/Where";

@EntityRepository()
export class EmailMessageRepository {

    constructor(private manager: EntityManager) {

    }

    public async insert(to: string, subject: string, message: string, type: string, providerId: number): Promise<InsertResult> {
        const obj = new Email(to, subject, message, type, providerId)
        return this.manager.createQueryBuilder()
        .insert()
        .into(Email)
        .values(obj)
        .execute()
    }

    public async gets(type: string, to: string, providerId: number): Promise<Email[]> {   
        const conds = [Cond.equal("providerId", providerId)]
        if (type != null) {
            conds.push(Cond.equal("type", type))
        }
        if (to != null) {
            conds.push(Cond.equal("to", to))
        }
        
        return this.manager.createQueryBuilder(Email, "t")
        .select(Email.basic("t"))
        .where(Where.and(conds, "t"))
        .orderBy({
            "t.id": "DESC"
        })
        .getMany()
    }

    public async get(id: number, accountId: number): Promise<Email> {   
        return this.manager.createQueryBuilder(Email, "t")
        .select(Email.detail("t"))
        .innerJoin("t.provider", "p", Where.and([Cond.equal("accountId", accountId)], "p"))
        .where(Where.and([Cond.equal("id", id)], "t"))
        .getOne()
    }

}