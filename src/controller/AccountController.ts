import { Request , Response} from "express"
import { JsonController, Req, OnUndefined, Res, Post } from "routing-controllers";
import { Account } from "../entity/Account";
import { AccountService } from "../service/AccountService";
import { RCode } from "../common/Enum";

@JsonController("/account")
export class AccountController {

    @Post()
    @OnUndefined(RCode.badRequest)
    async create(@Req() request: Request, @Res() response: Response): Promise<any> {
        const email = request.body.email
        if (await new Account(email, null).verifySkipNull()) {
            const result = await AccountService.create(email)
            return response.status(result.code).send(result.data)
        }
    }

}