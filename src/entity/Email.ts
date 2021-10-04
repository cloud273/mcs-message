import { Column, Entity, ManyToOne } from "typeorm";
import { MaxLength, IsPositive, IsEmail } from "class-validator";
import { Base, Basic, Detail } from "../common/Base";
import { EmailProvider } from "./EmailProvider";

@Entity()
export class Email extends Base {
   
    @Column({type: "varchar", length: 32})
    @MaxLength(32)
    @Detail()
    type: string

    @Column({type: "varchar", length: 128})
    @IsEmail() @MaxLength(128)
    @Basic() @Detail()
    to: string

    @Column("text")
    @MaxLength(1024)
    @Detail()
    subject: string

    @Column({type: "text", nullable: true})
    @MaxLength(8096)
    @Detail()
    message: string

    @ManyToOne(type => EmailProvider, obj => obj.emails)
    provider: EmailProvider

    @Column()
    @IsPositive()
    providerId: number

    public constructor(to: string, subject: string, message: string, type: string, providerId: number) {
        super()
        this.to = to
        this.subject = subject
        this.message = message
        this.type = type
        this.providerId = providerId
    }

}