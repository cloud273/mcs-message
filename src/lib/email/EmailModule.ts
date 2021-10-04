import { Log } from "../../../node/library/log/Log";
import AsyncLock = require('async-lock');
import nodemailer = require('nodemailer');

export class EmailModule {

    private service : any
    private lock = new AsyncLock();
    private sender: string

    public constructor(host: string, sender: string, password: string, port: number, secure: boolean) {
        this.service = nodemailer.createTransport({
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: sender,
                pass: password
            }
        })
        this.sender = sender
    }

    private async _send(to: string, subject: string, body: string) : Promise<any> {
        const domain = this.sender.replace(/.*@/, "")
        const messageId = "cloud273-" + String.random() + "@" + domain
        const mailOptions = {
            from: this.sender,
            to: to,
            subject: subject,
            html: body,
            headers: {
                "Message-Id": messageId 
            },
            dns: {
                id: messageId,
                return: 'headers',
                notify: ['failure', 'delay'],
                recipient: this.sender
            }
        }

        return new Promise((resolve, reject) => {
            this.service.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(info)
                }
            });
        })
    }

    public async send(to: string, subject: string, body: string) : Promise<any> {
        let result: any
        await this.lock.acquire("EmailModule.send", async () => {
            result = await this._send(to, subject, body)
        })
        .catch( (err)=> {
            Log.message("EmailModule.send", err)
        })
        return result
    }

}