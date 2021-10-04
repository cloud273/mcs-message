import { Request , Response} from "express"
import { JsonController, Req, OnUndefined, Res, Get, Post } from "routing-controllers";
import { RCode } from "../common/Enum";
import { EmailProvider } from "../entity/EmailProvider";
import { ApnsProvider } from "../entity/ApnsProvider";
import { ProviderService } from "../service/ProviderService";
import { FcmProvider } from "../entity/FcmProvider";

@JsonController("/provider")
export class ProviderController {

    @Post("/email")
    @OnUndefined(RCode.badRequest)
    async createEmailProvider(@Req() request: Request, @Res() response: Response): Promise<any> {
        const token = request.get("token")
        const host = request.body.host
        const sender = request.body.sender
        const password = request.body.password
        const port = request.body.port
        const secure = request.body.secure
        if (token != null && await new EmailProvider(host, sender, password, port, secure, 1).verifySkipNull(false)) {
            const result = await ProviderService.createEmailProvider(host, sender, password, port, secure, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Get("/email")
    @OnUndefined(RCode.badRequest)
    async getEmailProvider(@Req() request: Request, @Res() response: Response): Promise<any> {
        const token = request.get("token")
        const sender = request.query.sender
        if (token != null && sender != null && await new EmailProvider(null, sender, null, null, null, null).verifySkipNull()) {
            const result = await ProviderService.getEmailProvider(sender, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Post("/apns")
    @OnUndefined(RCode.badRequest)
    async createApnsProvider(@Req() request: Request, @Res() response: Response): Promise<any> {
        const token = request.get("token")
        const projectId = request.body.projectId
        const key = request.body.key
        const keyId = request.body.keyId
        const teamId = request.body.teamId
        if (token != null && await new ApnsProvider(projectId, key, keyId, teamId, 1).verifySkipNull(false)) {
            const result = await ProviderService.createApnsProvider(projectId, key, keyId, teamId, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Get("/apns")
    @OnUndefined(RCode.badRequest)
    async getApnsProvider(@Req() request: Request, @Res() response: Response): Promise<any> {
        const token = request.get("token")
        const projectId = request.query.projectId
        if (token != null && projectId != null && await new ApnsProvider(projectId, null, null, null, null).verifySkipNull()) {
            const result = await ProviderService.getApnsProvider(projectId, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Post("/fcm")
    @OnUndefined(RCode.badRequest)
    async createFcmProvider(@Req() request: Request, @Res() response: Response): Promise<any> {
        const token = request.get("token")
        const projectId = request.body.projectId
        const clientEmail = request.body.clientEmail
        const privateKey = request.body.privateKey
        if (token != null && await new FcmProvider(projectId, clientEmail, privateKey, 1).verifySkipNull(false)) {
            const result = await ProviderService.createFcmProvider(projectId, clientEmail, privateKey, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Get("/fcm")
    @OnUndefined(RCode.badRequest)
    async getFcmProvider(@Req() request: Request, @Res() response: Response): Promise<any> {
        const token = request.get("token")
        const projectId = request.query.projectId
        if (token != null && projectId != null && await new FcmProvider(projectId, null, null, null).verifySkipNull()) {
            const result = await ProviderService.getFcmProvider(projectId, token)
            return response.status(result.code).send(result.data)
        } 
    }

}