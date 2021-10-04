import { ApnsModule } from "./ApnsModule";

export class ApnsManager {

    private static instance = new ApnsManager()

    private data: any

    constructor() {
        this.data = {}
    }

    private get(key: string, keyId: string, teamId: string, isProduction: boolean): ApnsModule {
        const k = "key = " + key + '\n' + "keyId = " + keyId + '\n' + "teamId = " + teamId + '\n' + "production = " + isProduction
        let r = this.data[k]
        if (r == null) {
            r = new ApnsModule(key, keyId, teamId, isProduction)
            this.data[k] = r
        }
        return r
    }

    static get(key: string, keyId: string, teamId: string, isProduction: boolean = false): ApnsModule {
        return ApnsManager.instance.get(key, keyId, teamId, isProduction)
    }

}