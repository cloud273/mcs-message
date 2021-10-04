import { RCode } from "./Enum";

export class Result {

    code : number
    data? : any

    constructor(code: number, data: any) {
        this.code = code
        this.data = data
    }

    static init(code: number, data: any = null): Result {
        return new Result(code, data)
    }

    static success(data: any = null): Result {
        return new Result(RCode.success, data)
    }

    static serviceUnAvailable(data: any = null): Result {
        return new Result(RCode.serviceUnAvailable, data)
    }

    static notAcceptable(data: any = null): Result {
        return new Result(RCode.notAcceptable, data)
    }

    static notFound(data: any = null): Result {
        return new Result(RCode.notFound, null)
    }

    static forbidden(data: any = null): Result {
        return new Result(RCode.forbidden, null)
    }

    static unAuthorized(data: any = null): Result {
        return new Result(RCode.unAuthorized, null)
    }

    static expectationFailed(data: any = null): Result {
        return new Result(RCode.expectationFailed, null)
    }

    static internalServerError(data: any = null): Result {
        return new Result(RCode.internalServerError, null)
    }

}
