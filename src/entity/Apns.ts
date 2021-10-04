import { Column, Entity, ManyToOne } from "typeorm";
import { MaxLength, IsPositive, Min, Max, IsBoolean } from "class-validator";
import { Base, Detail } from "../common/Base";
import { ApnsProvider } from "./ApnsProvider";

@Entity()
export class Apns extends Base {
    
    @Column({type: "varchar", length: 128})
    @MaxLength(128)
    @Detail()
    appBundle: string

    @Column({type: "varchar", length: 32})
    @MaxLength(32)
    @Detail()
    type: string

    @Column({type: "varchar", length: 128})
    @MaxLength(128, {each: true})
    @Detail()
    device: string

    @Column({type: "varchar", length: 256, nullable: true})
    @MaxLength(256)
    @Detail()
    title: string

    @Column({type: "varchar", length: 256, nullable: true})
    @MaxLength(256)
    @Detail()
    body: string

    @Column({type: "simple-json", nullable: true})
    @Detail()
    payload: any

    @Column({type: "int", width: 4, nullable: true})
    @Min(1)
    @Max(9999)
    @Detail()
    badge: number

    @Column({type: "varchar", length: 32, nullable: true})
    @MaxLength(32)
    @Detail()
    sound: string

    @Column("boolean")
    @IsBoolean()
    @Detail()
    isProduction: boolean

    @ManyToOne(type => ApnsProvider, obj => obj.messages)
    provider: ApnsProvider

    @Column()
    @IsPositive()
    providerId: number

    public constructor(appBundle: string, type: string, device: string, title: string, body: string, payload: any, badge: number, sound: string, isProduction: boolean, providerId: number) {
        super()
        this.appBundle = appBundle
        this.type = type
        this.device = device
        this.title = title
        this.body = body
        this.payload = payload
        this.badge = badge
        this.sound = sound
        this.isProduction = isProduction
        this.providerId = providerId
    }

}