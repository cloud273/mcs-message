import { EntityRepository, EntityManager, InsertResult } from "typeorm";
import { ApnsProvider } from "../entity/ApnsProvider";
import { Cond } from "../../node/library/sql/Cond";
import { Where } from "../../node/library/sql/Where";

@EntityRepository()
export class ApnsProviderRepository {

    constructor(private manager: EntityManager) {

    }

    public async insert(projectId: string, key: string, keyId: string, teamId: string, accountId: number): Promise<InsertResult> {
        const obj = new ApnsProvider(projectId, key, keyId, teamId, accountId)
        return this.manager.createQueryBuilder()
        .insert()
        .into(ApnsProvider)
        .values(obj)
        .execute()
    }

    public async get(projectId: string, accountId: number): Promise<ApnsProvider> {   
        return this.manager.createQueryBuilder(ApnsProvider, "t")
        .select(ApnsProvider.detail("t"))
        .where(Where.and([
            Cond.equal("projectId", projectId),  
            Cond.equal("accountId", accountId)
        ], "t"))
        .getOne()
    }

    public async getId(projectId: string, accountId: number): Promise<number> {   
        const obj = await this.manager.createQueryBuilder(ApnsProvider, "t")
        .select(ApnsProvider.id("t"))
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
        return this.manager.createQueryBuilder(ApnsProvider, "t")
        .where(Where.and([Cond.equal("accountId", accountId)], "t"))
        .getCount()
    }

}