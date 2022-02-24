import { Request, Response} from "express";
import { Req, JsonController, Get, Res, OnUndefined, Post } from "routing-controllers";
import { RCode } from "../common/Enum";
import { ApnsProvider } from "../entity/ApnsProvider";
import { Apns } from "../entity/Apns";
import { ApnsService } from "../service/ApnsService";
import { IsArrayString } from "../lib/validate/Function";

@JsonController("/apns")
export class ApnsController {

    @Post()
    @OnUndefined(RCode.badRequest)
    async send(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const appBundle = request.body.appBundle
        const type = request.body.type
        const devices = request.body.devices
        const title = request.body.title
        const body = request.body.body
        const payload = request.body.payload
        const badge = request.body.badge
        const sound = request.body.sound
        const isProduction = request.body.isProduction
        const projectId = request.body.projectId
        if (token != null && appBundle != null && type != null && devices != null && projectId != null
            && await new ApnsProvider(projectId, null, null, null, null).verifySkipNull() 
            && await new Apns(appBundle, type, null, title, body, payload, badge, sound, isProduction, null).verifySkipNull()) {
            if (IsArrayString(devices, 128)) {
                const result = await ApnsService.create(appBundle, type, devices, title, body, payload, badge, sound, isProduction, projectId, token)
                return response.status(result.code).send(result.data)
            }
        } 
    }

    @Get("/list")
    @OnUndefined(RCode.badRequest)
    async gets(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const projectId = request.query.projectId as string
        const appBundle = request.query.appBundle as string
        const type = request.query.type as string
        const device = request.query.device as string
        if (token != null && projectId != null && appBundle != null
            && await new ApnsProvider(projectId, null, null, null, null).verifySkipNull() 
            && new Apns(appBundle, type, device, null, null, null, null, null, null, null).verifySkipNull()) {
            const result = await ApnsService.gets(projectId, appBundle, type, device, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Get()
    @OnUndefined(RCode.badRequest)
    async get(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const id = request.query.id
        if (token != null && id != null) {
            const result = await ApnsService.get(Number(id), token)
            return response.status(result.code).send(result.data)
        } 
    }

}