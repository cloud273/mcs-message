import TokenGenerator = require('uuid-token-generator');
import moment = require('moment');

export class Global {

    public static startup() {
        console.log("--------------------------------------------------")
        console.log("---------------Prepare Build Global---------------")
        console.log("--------------------------------------------------")
    }

}

declare global {

    interface Date {
        string(): string
        dateString(): string
        timeString(): string
        stringWithFormat(format: string): string
        offset(date: Date): number
        second(): number
        addSecond(second: number): Date
        gmtWithZoneString(): string
    }

    interface String {
        toJson(): any
        toArray(): string[]
        toNumbers(): number[]
        toDates(): Date[]
        toInt(): number
        toFloat(): number
        toBoolean(): boolean
    }

    interface StringConstructor {
        random(): string
    }

}

Date.prototype.addSecond = function(second: number): Date {
    return new Date(this.getTime() + second * 1000)
}

Date.prototype.second = function(): number {
    return this.getTime()/1000
}


Date.prototype.offset = function(date: Date): number {
    return (this.getTime() - date.getTime())/1000
}

Date.prototype.string = function(): string {
    return moment(this).format("YYYY-MM-DD HH:mm:ss")
}

Date.prototype.dateString = function(): string {
    return moment(this).format("YYYY-MM-DD")
}

Date.prototype.timeString = function(): string {
    return moment(this).format("HH:mm:ss")
}

Date.prototype.stringWithFormat = function(format: string): string {
    return moment(this).format(format)
}

Date.prototype.gmtWithZoneString = function(): string {
    return moment.utc(this).format("YYYY-MM-DDTHH:mm:ssZZ")
}

String.prototype.toJson = function(): any {
    try {
        return JSON.parse(this)
    } catch (error) {
        console.log("string.toJson")
        console.log(error)
    }
    return null
}

String.prototype.toArray = function(): string[] {
    try {
        const result = JSON.parse(this)
        result.forEach(element => {
            if (typeof element !== 'string') {
                throw 'object is not string'
            }
        });
        return result
    } catch (error) {
        console.log("string.toArray")
        console.log(error)
    }
    return null
}

String.prototype.toNumbers = function(): number[] {
    let result : number[] = []
    const array = this.toJson()
    try {
        array.forEach(text => {
            result.push(Number(text))
        })
    } catch (error) {
        console.log("string.toNumbers")
        console.log(error)
    }
    return result
}

String.prototype.toDates = function(): Date[] {
    let result : Date[] = []
    const array = this.toJson()
    try {
        array.forEach(text => {
            result.push(new Date(text))
        })
    } catch (error) {
        console.log("string.toDates")
        console.log(error)
    }
    return result
}

String.prototype.toInt = function(): number {
    return parseInt(this)
}

String.prototype.toFloat = function(): number {
    return parseFloat(this)
}

String.prototype.toBoolean = function(): boolean {
    if (this === 'false') {
        return false
    } else if (this === 'true') {
        return true
    } else {
        console.log("string.toBoolean")
        console.log(this)
    }
    return null
}

String.random = function(): string {
    const tokgen = new TokenGenerator(512, TokenGenerator.BASE62)
    return tokgen.generate()
}

