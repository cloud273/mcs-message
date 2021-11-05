export class GsmModule {

    public static instance = new GsmModule()

    public async initialize() {
        
    }

    public async sendSMS(phone: string, message: string): Promise<boolean> {
        return false
    }

}

