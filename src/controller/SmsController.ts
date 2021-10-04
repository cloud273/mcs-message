import { Request, Response} from "express";
import { Req, JsonController, Get, Res, OnUndefined, Post } from "routing-controllers";
import { SmsService } from "../service/SmsService";
import { RCode } from "../common/Enum";
import { Sms } from "../entity/Sms";

@JsonController("/sms")
export class SmsController {

    @Post()
    @OnUndefined(RCode.badRequest)
    async send(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const phone = request.body.phone
        const message = request.body.message
        const type = request.body.type
        if (token != null && await new Sms(phone, message, type, 1).verifySkipNull(false)) {
            const result = await SmsService.create(phone, message, type, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Get("/list")
    @OnUndefined(RCode.badRequest)
    async gets(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const type = request.query.type
        const phone = request.query.phone
        if (token != null && await new Sms(phone, null, type, null).verifySkipNull()) {
            const result = await SmsService.gets(type, phone, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Get()
    @OnUndefined(RCode.badRequest)
    async get(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const id = request.query.id
        if (token != null && id != null) {
            const result = await SmsService.get(Number(id), token)
            return response.status(result.code).send(result.data)
        } 
    }

}