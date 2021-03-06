import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { Constant } from "../Constant";
import { useExpressServer } from "routing-controllers";
import { GsmModule } from "./lib/gsm/GsmModule";
import { Global } from "./lib/Global";

// Load constructor
Global.startup()

// Open MySQL connection
createConnection().then(async () => {

    // Gsm
    GsmModule.instance.initialize()

    // Create image and tmp image folder
    const fs = require('fs')

    // Create express app
    const app = express()

    // Accept parse json
    app.use(bodyParser.json())

    // Parse date respond
    app.set('json replacer', function (key, value) {
        if (this[key] instanceof Date) {
            value = this[key].toString();
        }
        return value;
    });

    // Start server
    app.listen(Constant.server.port)
    
    // Load router server
    useExpressServer(app, {
        routePrefix: Constant.routePrefix,
        controllers: [__dirname + "/controller/**/*ts"]
    })

    console.log("Startup success at", new Date().toString())

}).catch(error => console.log("Startup error", error));
