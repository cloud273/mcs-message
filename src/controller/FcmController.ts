import { Request, Response} from "express";
import { Req, JsonController, Get, Res, OnUndefined, Post } from "routing-controllers";
import { RCode } from "../common/Enum";
import { FcmProvider } from "../entity/FcmProvider";
import { Fcm } from "../entity/Fcm";
import { FcmService } from "../service/FcmService";
import { IsArrayString } from "../lib/validate/Function";

@JsonController("/fcm")
export class FcmController {

    @Post()
    @OnUndefined(RCode.badRequest)
    async send(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const type = request.body.type
        const devices = request.body.devices
        const title = request.body.title
        const body = request.body.body
        const icon = request.body.icon
        const sound = request.body.sound
        const tag = request.body.tag
        const projectId = request.body.projectId
        if (token != null && type != null && devices != null && await new FcmProvider(projectId, null, null, null).verifySkipNull() && await new Fcm(type, null, title, body, icon, sound, tag, null).verifySkipNull()) {
            if (IsArrayString(devices, 256)) {
                const result = await FcmService.create(type, devices, title, body, icon, sound, tag, projectId, token)
                return response.status(result.code).send(result.data)
            }
        } 
    }

    @Get("/list")
    @OnUndefined(RCode.badRequest)
    async gets(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const projectId = request.query.projectId as string
        const type = request.query.type as string
        const device = request.query.device as string
        if (token != null && projectId != null && await new FcmProvider(projectId, null, null, null).verifySkipNull() && new Fcm(type, device, null, null, null, null, null, null).verifySkipNull()) {
            const result = await FcmService.gets(projectId, type, device, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Get()
    @OnUndefined(RCode.badRequest)
    async get(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const id = request.query.id
        if (token != null && id != null) {
            const result = await FcmService.get(Number(id), token)
            return response.status(result.code).send(result.data)
        } 
    }

}