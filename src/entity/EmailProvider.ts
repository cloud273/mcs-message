import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MaxLength, IsPositive, IsEmail, Min, Max, IsBoolean } from "class-validator";
import { Base, Basic, Detail } from "../common/Base";
import { Account } from "./Account";
import { Email } from "./Email";

@Entity()
export class EmailProvider extends Base {

    @Column({type: "varchar", length: 64})
    @MaxLength(64)
    @Detail()
    host: string

    @Column({type: "varchar", length: 128, unique: true})
    @IsEmail() @MaxLength(128)
    @Basic() @Detail()
    sender: string

    @Column("text")
    @MaxLength(64)
    @Detail()
    password: string

    @Column({type: "int", width: 8})
    @Min(1)
    @Max(65536)
    @Detail()
    port: number

    @Column("boolean")
    @IsBoolean()
    @Detail()
    secure: boolean

    @ManyToOne(type => Account, obj => obj.emailProviders)
    account: Account

    @Column()
    @IsPositive()
    accountId: number

    @OneToMany(type => Email, obj => obj.provider, {cascade: true})
    emails: Email[]

    public constructor(host: string, sender: string, password: string, port: number, secure: boolean, accountId: number) {
        super()
        this.host = host
        this.sender = sender
        this.password = password
        this.port = port
        this.secure = secure
        this.accountId = accountId
    }

}