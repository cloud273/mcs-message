import { EntityRepository, EntityManager, InsertResult } from "typeorm";
import { Fcm } from "../entity/Fcm";
import { Cond } from "../../node/library/sql/Cond";
import { Where } from "../../node/library/sql/Where";

@EntityRepository()
export class FcmMessageRepository {

    constructor(private manager: EntityManager) {

    }
    public async insert(type: string, devices: string[], title: string, body: string, icon: string, sound: string, tag: string, providerId: number): Promise<InsertResult> {
        const objs = []
        devices.forEach(device => {
            objs.push(new Fcm(type, device, title, body, icon, sound, tag, providerId))
        });
        return this.manager.createQueryBuilder()
        .insert()
        .into(Fcm)
        .values(objs)
        .execute()
    }

    public async gets(type: string, device: string, providerId: number): Promise<Fcm[]> {
        const conds = [Cond.equal("providerId", providerId)]
        if (type != null) {
            conds.push(Cond.equal("type", type))
        }
        if (device != null) {
            conds.push(Cond.equal("device", device))
        }
        return this.manager.createQueryBuilder(Fcm, "t")
        .select(Fcm.basic("t"))
        .where(Where.and(conds, "t"))
        .orderBy({
            "t.id": "DESC"
        })
        .getMany()
    }

    public async get(id: number, accountId: number): Promise<Fcm> {   
        return this.manager.createQueryBuilder(Fcm, "t")
        .select(Fcm.detail("t"))
        .innerJoin("t.provider", "p", Where.and([Cond.equal("accountId", accountId)], "p"))
        .where(Where.and([Cond.equal("id", id)], "t"))
        .getOne()
    }

}