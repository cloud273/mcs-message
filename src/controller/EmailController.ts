import { Request, Response} from "express";
import { Req, JsonController, Get, Res, OnUndefined, Post } from "routing-controllers";
import { RCode } from "../common/Enum";
import { Email } from "../entity/Email";
import { EmailService } from "../service/EmailService";
import { EmailProvider } from "../entity/EmailProvider";

@JsonController("/email")
export class EmailController {

    @Post()
    @OnUndefined(RCode.badRequest)
    async send(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const sender = request.body.sender
        const to = request.body.to
        const subject = request.body.subject
        const message = request.body.message
        const type = request.body.type
        if (token != null && sender != null && await new EmailProvider(null, sender, null, null, null, null).verifySkipNull() && await new Email(to, subject, message, type, 1).verifySkipNull(false)) {
            const result = await EmailService.create(to, subject, message, type, sender, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Get("/list")
    @OnUndefined(RCode.badRequest)
    async gets(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const type = request.query.type as string
        const to = request.query.to as string
        const sender = request.query.sender as string
        if (token != null && sender != null && await new EmailProvider(null, sender, null, null, null, null).verifySkipNull() && await new Email(to, null, null, type, null).verifySkipNull()) {
            const result = await EmailService.gets(type, to, sender, token)
            return response.status(result.code).send(result.data)
        } 
    }

    @Get()
    @OnUndefined(RCode.badRequest)
    async get(@Req() request: Request, @Res() response: Response) {
        const token = request.get("token")
        const id = request.query.id
        if (token != null && id != null) {
            const result = await EmailService.get(Number(id), token)
            return response.status(result.code).send(result.data)
        } 
    }

}