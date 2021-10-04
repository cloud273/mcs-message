import * as admin from "firebase-admin";

export class FcmModule {

    private app : admin.app.App

    public constructor(projectId: string, clientEmail: string, privateKey: string) {
        this.app = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: projectId,
                clientEmail: clientEmail,
                privateKey: privateKey
            })
        })
    }

    private notification(title: string, body: string = null, tag: string = null, icon: string = null, sound: string = null) {
        var notification: admin.messaging.AndroidNotification = {}
        if (title != null) {
            notification.title = title
        }
        if (body != null) {
            notification.body = body
        }
        if (tag != null) {
            notification.tag = tag
        }
        if (icon != null) {
            notification.icon = icon
        }
        if (sound != null) {
            notification.sound = sound
        }
        return notification
    }

    public async send(devices: string[], title?: string, body?: string, icon?: string, sound?: string, tag?: string): Promise<any> {
        if (devices.length > 1) {
            const message: admin.messaging.MulticastMessage = {
                notification: this.notification(title, body, tag, icon, sound),
                tokens: devices
            }
            return this.app.messaging().sendMulticast(message)
        } else if (devices.length == 1) {
            const message: admin.messaging.Message = {
                notification: this.notification(title, body, tag, icon, sound),
                token: devices[0]
            }
            return this.app.messaging().send(message)
        } else {
            return null
        }
    }

}