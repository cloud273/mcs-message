# Content

- Message service is a micro service to help your server to send message/ notification to your mobile app (IOS/Android) and browser
- Api list: https://github.com/cloud273/mcs-sso/blob/main/doc/openapi.yaml

# Todo

- Support notification to browsers

# Develop


### Add submodule

`
git submodule add https://github.com/cloud273/node-utility.git node
`

### Main

`
git clone --recurse-submodules https://github.com/cloud273/mcs-message.git
`

`
git pull --recurse-submodules
`

### Sub-modules

`
git pull origin HEAD:master
`

`
git push origin HEAD:master
`


# Update all packages

`
npm i -g npm-check-updates
`

`
ncu -u
`

`
npm install
`

# SMS module

Copy GsmModule_BK to GsmModule

and

`
"serialport": "^9.2.3",
`

