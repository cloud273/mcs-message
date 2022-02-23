import { isArray, isString } from "class-validator";

export function IsArrayString(array: any, maxLengthString: number) : boolean {
    let result = true
    if (isArray(array) && array.length > 0) {
        for (const str of array) {
            if (isString(str)) {
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