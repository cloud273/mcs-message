import { EntityRepository, EntityManager, InsertResult } from "typeorm";
import { Apns } from "../entity/Apns";
import { Cond } from "../../node/library/sql/Cond";
import { Where } from "../../node/library/sql/Where";

@EntityRepository()
export class ApnsMessageRepository {

    constructor(private manager: EntityManager) {

    }

    public async insert(appBundle: string, type: string, devices: string[], title: string, body: string, payload: any, badge: number, sound: string, isProduction: boolean, providerId: number): Promise<InsertResult> {
        const objs = []
        devices.forEach(device => {
            objs.push(new Apns(appBundle, type, device, title, body, payload, badge, sound, isProduction, providerId))
        });
        return this.manager.createQueryBuilder()
        .insert()
        .into(Apns)
        .values(objs)
        .execute()
    }

    public async gets(appBundle: string, type: string, device: string, providerId: number): Promise<Apns[]> {
        const conds = [Cond.equal("providerId", providerId), Cond.equal("appBundle", appBundle)]
        if (type != null) {
            conds.push(Cond.equal("type", type))
        }
        if (device != null) {
            conds.push(Cond.equal("device", device))
        }
        return this.manager.createQueryBuilder(Apns, "t")
        .select(Apns.basic("t"))
        .where(Where.and(conds, "t"))
        .orderBy({
            "t.id": "DESC"
        })
        .getMany()
    }

    public async get(id: number, accountId: number): Promise<Apns> {   
        return this.manager.createQueryBuilder(Apns, "t")
        .select(Apns.detail("t"))
        .innerJoin("t.provider", "p", Where.and([Cond.equal("accountId", accountId)], "p"))
        .where(Where.and([Cond.equal("id", id)], "t"))
        .getOne()
    }

}