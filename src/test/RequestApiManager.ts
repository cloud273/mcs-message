import { ApiResponse, Api } from "../../node/library/http/Api";

export class RequestApiManager {

    private static host = "http://localhost:3030"
    private static token = "0TnZF2TArcBp8r48MwNx1Fl0OMRS03KYbn6aUEMtn5hC9dXJiqa2wO9AvIdCJodHOBjiTF1KNXLpv897OnYQHF"
    private static sender = "cskh@datchonhanh.com"

    private static async request(endPoint: string, method: string, qs: {} | null, body: {} | null) : Promise<ApiResponse> {
        const uri = this.host + '/api' + endPoint
        const headers = {
            token: this.token
        }
        return Api.request(uri, method, qs, headers, body)
    }

    public static async getEmailProvider() : Promise<any> {
        const qs = {
            sender: this.sender,
        }
        return this.request("/provider/email", 'GET', qs, null)
    }

    public static async sendEmail(to: string, subject: string, message: string, type: string) : Promise<any> {
        const body = {
            to: to,
            sender: this.sender,
            subject: subject,
            message: message,
            type: type
        }
        return this.request("/email", 'POST', null, body)
    }

    public static async sendSms(to: string, message: string, type: string) : Promise<any> {
        const body = {
            phone: to,
            message: message,
            type: type
        }
        return this.request("/sms", 'POST', null, body)
    }

}
