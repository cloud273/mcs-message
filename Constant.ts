'use strict';

import Path = require('path');

export const Constant = {
    server: {
        port: 4004
    },
    routePrefix: "/api",
    serial: {
        port: "/dev/ttyUSB0",
        // port: "/dev/tty.SLAB_USBtoUART",
        baud: 115200,
        password: '13110',
    },
    rootEmail: {
        host: "smtp.zoho.com",
        sender: "admin@datchonhanh.com",
        password: "SM5QEek76cfT",
        port: 465,
        secure: true
    },
    welcomeEmail: {
        subject: "Welcome",
        message: "Welcome to cloud273 message service"
    },
    verifyEmail: {
        subject: "Successful",
        message: "Your email service have been created successfully"
    },
    provider: {
        maxEmail: 10,
        maxApns: 10,
        maxFcm: 10
    },
}

