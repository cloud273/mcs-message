import * as apn from "apn"

export class ApnsModule {

    private service : apn.Provider

    public constructor(key: string, keyId: string, teamId: string, isProduction: boolean = false) {
        const options = {
            token: {
                key: key,
                keyId: keyId,
                teamId: teamId,
            },
            production: isProduction
        }
        this.service = new apn.Provider(options)
    }

    public async send(appBundle: string, devices: string[], title: string, body: string, payload?: any, badge?: number, sound?: string /*"ping.aiff"*/): Promise<any> {
        const alert : apn.NotificationAlertOptions = {
            body: body
        }
        if (title != null) {
            alert["title"] = title
        }
        var note = new apn.Notification(payload);
        note.badge = badge;
        note.sound = sound;
        note.alert = alert;
        note.topic = appBundle
        return this.service.send(note, devices)
    }


}