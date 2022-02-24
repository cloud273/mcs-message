import * as httpRequest from "request-promise";
import { Constant } from "../../Constant";

export class Test {

    private static host = "http://localhost:" + Constant.server.port
    private static token = "0TnZF2TArcBp8r48MwNx1Fl0OMRS03KYbn6aUEMtn5hC9dXJiqa2wO9AvIdCJodHOBjiTF1KNXLpv897OnYQHF"

    static async sendApns() : Promise<any> {
        const options = {
            method: 'POST',
            uri: this.host + '/api/apns',
            body: {
                devices: ["bbc01506b9267d88b58aa3f569356e47b330be0530364f592e6dab99d8047796"],
                projectId: "mcs-cloud273",
                appBundle: "com.cloud273.patient",
                title: "hello",
                body: "welcome to mcs",
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

    static async sendFcm() : Promise<any> {
        const options = {
            method: 'POST',
            uri: this.host + '/api/fcm',
            body: {
                devices: ["dtldhhhuQouETG8EJoWKkW:APA91bHheOPFj6_CL0w-yV9TURIJurc8xw3v2RHIXJwhpSGDPaVYVTHkDfOebW2ekfb2fSo7ORhsUJBN_xDMok3ygWSne2Ckh-pwJeky-9TDLBz98TGMYGP-28qcb9s3g7opOwIxy0CH"],
                projectId: "mcs-cloud273",
                title: "hello",
                body: "welcom to mcs",
                type: "type",
            },
            headers: {
                token: this.token
            },
            json: true
        } 
        return httpRequest(options)
    }

    static async sendEmail() : Promise<any> {
        const options = {
            method: 'POST',
            uri: this.host + '/api/email',
            body: {
                to: "nglequduph@gmail.com",
                sender: "cskh@datchonhanh.com",
                subject: "hello",
                type: "type",
                message: "welcome to mcs",
            },
            headers: {
                token: this.token
            },
            json: true
        } 
        return httpRequest(options)
    }

    

}