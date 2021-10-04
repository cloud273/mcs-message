import { Column, Entity, ManyToOne } from "typeorm";
import { MaxLength, IsPositive } from "class-validator";
import { Base, Basic, Detail } from "../common/Base";
import { Account } from "./Account";

@Entity()
export class Sms extends Base {
   
    @Column({type: "varchar", length: 64})
    @MaxLength(64)
    @Detail()
    type: string

    @Column({type: "varchar", length: 16})
    @MaxLength(16)
    @Basic() @Detail()
    phone: string

    @Column({type: "varchar", length: 256})
    @MaxLength(256)
    @Detail()
    message: string

    @ManyToOne(type => Account, obj => obj.smses)
    account: Account

    @Column()
    @IsPositive()
    accountId: number

    public constructor(phone: string, message: string, type: string, accountId: number) {
        super()
        this.phone = phone
        this.message = message
        this.type = type
        this.accountId = accountId
    }

}