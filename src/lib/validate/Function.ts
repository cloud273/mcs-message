import { Validator } from "class-validator";

export function IsArrayString(array: any, maxLengthString: number) : boolean {
    let result = true
    const validator = new Validator()
    if (validator.isArray(array) && array.length > 0) {
        for (const str of array) {
            if (validator.isString(str)) {
                if (str.length > maxLengthString) {
                    result = false
                    break
                }
            } else {
                result = false
                break
            }
        }
    } else {
        result = false
    }
    return result
}