import { Column, Entity, ManyToOne } from "typeorm";
import { MaxLength, IsPositive } from "class-validator";
import { Base, Detail } from "../common/Base";
import { FcmProvider } from "./FcmProvider";

@Entity()
export class Fcm extends Base { 

    @Column({type: "varchar", length: 32})
    @MaxLength(32)
    @Detail()
    type: string

    @Column({type: "varchar", length: 256})
    @MaxLength(256)
    @Detail()
    device: string

    @Column({type: "varchar", length: 256})
    @MaxLength(256)
    @Detail()
    title: string

    @Column({type: "text", nullable: true})
    @MaxLength(2048)
    @Detail()
    body: string

    @Column({type: "varchar", length: 32, nullable: true})
    @MaxLength(32)
    @Detail()
    tag: string

    @Column({type: "varchar", length: 32, nullable: true})
    @MaxLength(32)
    @Detail()
    icon: string

    @Column({type: "varchar", length: 32, nullable: true})
    @MaxLength(32)
    @Detail()
    sound: string

    @ManyToOne(type => FcmProvider, obj => obj.messages)
    provider: FcmProvider

    @Column()
    @IsPositive()
    providerId: number

    public constructor(type: string, device: string, title: string, body: string, icon: string, sound: string, tag: string, providerId: number) {
        super()
        this.type = type
        this.device = device
        this.title = title
        this.body = body
        this.icon = icon
        this.sound = sound
        this.tag = tag
        this.providerId = providerId
    }

}