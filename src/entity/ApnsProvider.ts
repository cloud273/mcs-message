import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { MaxLength, IsPositive } from "class-validator";
import { Base, Detail, Basic } from "../common/Base";
import { Account } from "./Account";
import { Apns } from "./Apns";

@Entity()
@Unique(["projectId", "accountId"])
export class ApnsProvider extends Base {

    @Column({type: "varchar", length: 32})
    @MaxLength(32)
    @Basic()
    projectId: string

    @Column({type: "text"})
    @MaxLength(4096)
    @Detail()
    key: string

    @Column({type: "varchar", length: 32})
    @MaxLength(32)
    @Detail()
    keyId: string

    @Column({type: "varchar", length: 32})
    @MaxLength(32)
    @Detail()
    teamId: string

    @ManyToOne(type => Account, obj => obj.apnsProviders)
    account: Account

    @Column()
    @IsPositive()
    accountId: number

    @OneToMany(type => Apns, obj => obj.provider, {cascade: true})
    messages: Apns[]

    public constructor(projectId: string, key: string, keyId: string, teamId: string, accountId: number) {
        super()
        this.projectId = projectId
        this.key = key
        this.keyId = keyId
        this.teamId = teamId
        this.accountId = accountId
    }

}