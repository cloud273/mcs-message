import { EntityRepository, EntityManager, InsertResult } from "typeorm";
import { FcmProvider } from "../entity/FcmProvider";import { Cond } from "../../node/library/sql/Cond";
import { Where } from "../../node/library/sql/Where";
;

@EntityRepository()
export class FcmProviderRepository {

    constructor(private manager: EntityManager) {

    }

    public async insert(projectId: string, clientEmail: string, privateKey: string, accountId: number): Promise<InsertResult> {
        const obj = new FcmProvider(projectId, clientEmail, privateKey, accountId)
        return this.manager.createQueryBuilder()
        .insert()
        .into(FcmProvider)
        .values(obj)
        .execute()
    }

    public async get(projectId: string, accountId: number): Promise<FcmProvider> {   
        return this.manager.createQueryBuilder(FcmProvider, "t")
        .select(FcmProvider.detail("t"))
        .where(Where.and([
            Cond.equal("projectId", projectId),  
            Cond.equal("accountId", accountId)
        ], "t"))
        .getOne()
    }

    public async getId(projectId: string, accountId: number): Promise<number> {   
        const obj = await this.manager.createQueryBuilder(FcmProvider, "t")
        .select(FcmProvider.id("t"))
        .where(Where.and([
            Cond.equal("projectId", projectId),  
            Cond.equal("accountId", accountId)
        ], "t"))
        .getOne()
        if (obj != null) {
            return obj.id
        } else {
            return null
        }
    }

    public async count(accountId: number): Promise<number> {   
        return this.manager.createQueryBuilder(FcmProvider, "t")
        .where(Where.and([Cond.equal("accountId", accountId)], "t"))
        .getCount()
    }

}