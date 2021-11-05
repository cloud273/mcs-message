// import { Constant } from "../../../Constant";
// import { Log } from "../../../node/library/log/Log";
// import AsyncLock = require('async-lock');

// export class GsmModule {

//     public static instance = new GsmModule()
//     private lock = new AsyncLock()
//     private delay = require('delay')
//     private serialPort = require('serialport')
//     private port: any
//     private isOkie: boolean = false

//     public async initialize() {
//         await this.runPortPermission()
//         .catch(err => {
//             console.log(err)
//         });
//         this.port = new this.serialPort(Constant.serial.port, { baudRate: Constant.serial.baud}, function(error) {
//             if (error) {
//                 console.log('Open error: ', error.message)
//             } else {
//                 console.log("Open success");
//                 GsmModule.instance.isOkie = true // cheat code here
//             }
//         })

//         this.port.on('data', function (data) {
//             console.log('data:', data.toString());
//         });
//     }

//     private async runPortPermission(): Promise<any> {
//         return new Promise((resolve, reject) => {
//             var sudo = require('sudo-js');
//             sudo.setPassword(Constant.serial.password);
//             var command = ['chmod', '666', Constant.serial.port];
//             sudo.exec(command, function(err, pid, result) {
//                 resolve(err == null)
//             });
//         })
//     }

//     private async write(text: string): Promise<any> {
//         return new Promise((resolve, reject) => {
//             this.port.write(text, function(error) {
//                 if (error) {
//                     reject(error)
//                 } else {
//                     resolve(null)
//                 }
//             });
//         })
//     }

//     private async send(message: any, enter: boolean = true, milisecond: number = 100): Promise<any> {
//         let text = message
//         if (enter) {
//             text += '\r\n'
//         }
//         let result
//         await this.write(text)
//         .then(() => {
//             result = null
//         }).catch(error => {
//             result = error
//         })
//         await this.delay(milisecond)
//         return result
//     }
    
//     private async _sendSMS(phone: string, message: string): Promise<boolean> {
//         if (this.isOkie) {
//             let result = await this.send("AT")
//             if (result == null) {
//                 result = await this.send("AT+CMGF=1")
//                 if (result == null) {
//                     result = await this.send("AT+CSCS=\"GSM\"")
//                     if (result == null) {
//                         result = await this.send("AT+CMGS=\"" + phone + "\"")
//                         if (result == null) {
//                             result = await this.send(message)
//                             if (result == null) {
//                                 result = await this.send('\x1A', false)
//                             }
//                         }
//                     }
//                 } 
//             } 
//             return result == null                
//         } else {
//             Log.message("GsmModule._sendSMS", "No device detected on port" + this.port)
//             return false
//         }
        
//     }

//     public async sendSMS(phone: string, message: string): Promise<boolean> {
//         // let result: boolean
//         // await this.lock.acquire("GsmModule.sendSMS", async () => {
//         //     result = await this._sendSMS(phone, message)
//         // })
//         // .catch( (err)=> {
//         //     Log.message("GsmModule.sendSMS", err)
//         //     result = false
//         // })
//         // return result
//     }

// }

