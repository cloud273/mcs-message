import * as httpRequest from "request-promise";

export class Test {

    private static host = "http://localhost:3030"
    private static token = "0TnZF2TArcBp8r48MwNx1Fl0OMRS03KYbn6aUEMtn5hC9dXJiqa2wO9AvIdCJodHOBjiTF1KNXLpv897OnYQHF"

    private static async sendApns() : Promise<any> {
        const options = {
            method: 'POST',
            uri: this.host + '/api/apns',
            body: {
                devices: ["a98e51eaa1c8bbe6bc2367333439ad601c55cd73b653ceae6173bceeab5559e2"],
                projectId: "mcs-cloud273",
                appBundle: "com.cloud273.patient",
                title: "title",
                payload: {
                    test: "test"
                },
                type: "type",
                isProduction: false
            },
            headers: {
                token: this.token
            },
            json: true
        } 
        return httpRequest(options)
    }

    private static async sendFcm() : Promise<any> {
        const options = {
            method: 'POST',
            uri: this.host + '/api/fcm',
            body: {
                devices: ["eoDYrvCWHSo:APA91bHI8RbbfjX77J6jDAQd07cqt3hPFwMcXYahES4Y9i-xthRCyi9d_88vwWe1MeFzz49WUkMB_dMD3BoL-1xJU7BF8yop77AY-9WYBj7WYWTQ_W79aXsO5Nn6tUtXF9SM1AWVXW9T"],
                projectId: "mcs-cloud273",
                title: "title",
                body: "body",
                type: "type",
            },
            headers: {
                token: this.token
            },
            json: true
        } 
        return httpRequest(options)
    }

}