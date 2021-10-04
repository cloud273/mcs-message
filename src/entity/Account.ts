import { Column, Entity, OneToMany } from "typeorm";
import { Base, Basic, Detail } from "../common/Base";
import { MaxLength, IsEmail } from "class-validator";
import { Sms } from "./Sms";
import { EmailProvider } from "./EmailProvider";
import { ApnsProvider } from "./ApnsProvider";
import { FcmProvider } from "./FcmProvider";

@Entity()
export class Account extends Base {

    @Column({type:"varchar", length: 128, unique: true})
    @IsEmail()
    @MaxLength(128)
    @Basic() @Detail()
    username: string

    @Column({type: "varchar", length: 128, unique: true, readonly: true})
    @Detail()
    token: string

    @OneToMany(type => Sms, obj => obj.account, {cascade: true})
    smses: Sms[]

    @OneToMany(type => EmailProvider, obj => obj.account, {cascade: true})
    emailProviders: EmailProvider[]

    @OneToMany(type => ApnsProvider, obj => obj.account, {cascade: true})
    apnsProviders: ApnsProvider[]

    @OneToMany(type => FcmProvider, obj => obj.account, {cascade: true})
    fcmProviders: FcmProvider[]

    public constructor(username: string, token: string) {
        super()
        this.username = username
        this.token = token
    }

}
