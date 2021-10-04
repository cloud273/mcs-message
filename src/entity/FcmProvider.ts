import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { MaxLength, IsPositive, IsEmail } from "class-validator";
import { Base, Detail, Basic } from "../common/Base";
import { Account } from "./Account";
import { Fcm } from "./Fcm";

@Entity()
@Unique(["projectId", "accountId"])
export class FcmProvider extends Base {

    @Column({type: "varchar", length: 32})
    @MaxLength(32)
    @Basic() @Detail()
    projectId: string

    @Column({type: "varchar", length: 128})
    @IsEmail() @MaxLength(128)
    @Basic() @Detail()
    clientEmail: string

    @Column({type: "text"})
    @MaxLength(4096)
    @Detail()
    privateKey: string

    @ManyToOne(type => Account, obj => obj.fcmProviders)
    account: Account

    @Column()
    @IsPositive()
    accountId: number

    @OneToMany(type => Fcm, obj => obj.provider, {cascade: true})
    messages: Fcm[]

    public constructor(projectId: string, clientEmail: string, privateKey: string, accountId: number) {
        super()
        this.projectId = projectId
        this.clientEmail = clientEmail
        this.privateKey = privateKey
        this.accountId = accountId
    }

}