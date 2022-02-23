import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { validate } from "class-validator";
import { ScopeEntity, Scope, ScopeNested } from "../../node/library/decoration/ScopeEntity";
import { Log } from "../../node/library/log/Log";

enum ScopeType {
    id = "id",
    basic = "basic",
    detail = "detail"
}

// ==================== Decoration ====================

export function Id() {
    return Scope(ScopeType.id)
}

export function Basic() {
    return Scope(ScopeType.basic)
}

export function BasicNested(clas: Function) {
    return ScopeNested(ScopeType.basic, clas)
}

export function Detail() {
    return Scope(ScopeType.detail)
}

export function DetailNested(clas: Function) {
    return ScopeNested(ScopeType.detail, clas)
}

// ==================== Base Class ====================

export abstract class Base extends ScopeEntity {

    public async verifySkipNull(isSkipNull: boolean = true): Promise<boolean> {
        const errors = await validate(this, {skipMissingProperties: isSkipNull})
        if (errors != null && errors.length > 0) {
            Log.message("Validation", errors)
        }
        return (errors == null || errors.length == 0)
    }

    @PrimaryGeneratedColumn()
    @Id() @Basic() @Detail()
    id: number

    @CreateDateColumn({select: false})
    createdAt: Date

    @UpdateDateColumn({select: false})
    updatedAt: Date

    @VersionColumn({select: false})
    version: number

    public static id(alias?: string): string[] {
        return this.scope(ScopeType.id, alias)
    }

    public static basic(alias?: string): string[] {
        return this.scope(ScopeType.basic, alias)
    }

    public static detail(alias?: string): string[] {
        return this.scope(ScopeType.detail, alias)
    }

}