import { EmailModule } from "./EmailModule";

export class EmailManager {

    private static instance = new EmailManager()

    private data: any

    constructor() {
        this.data = {}
    }

    private get(host: string, sender: string, password: string, port: number, secure: boolean): EmailModule {
        const k = "host = " + host + '\n' + "sender = " + sender + '\n' + "password = " + password + '\n' + "port = " + port + '\n' + "secure = " + secure 
        let r = this.data[k]
        if (r == null) {
            r = new EmailModule(host, sender, password, port, secure)
            this.data[k] = r
        }
        return r
    }

    static get(host: string, sender: string, password: string, port: number, secure: boolean): EmailModule {
        return EmailManager.instance.get(host, sender, password, port, secure)
    }

}