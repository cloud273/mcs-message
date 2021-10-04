import { FcmModule } from "./FcmModule";

export class FcmManager {

    private static instance = new FcmManager()

    private data: any

    constructor() {
        this.data = {}
    }

    private get(projectId: string, clientEmail: string, privateKey: string): FcmModule {
        const k = "projectId = " + projectId + '\n' + "clientEmail = " + clientEmail
        if (k != null) {
            let r = this.data[k]
            if (r == null) {
                r = new FcmModule(projectId, clientEmail, privateKey)
                this.data[k] = r
            }
            return r
        }
        return null
    }

    static get(projectId: string, clientEmail: string, privateKey: string): FcmModule {
        return FcmManager.instance.get(projectId, clientEmail, privateKey)
    }

}