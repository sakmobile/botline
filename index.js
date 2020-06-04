const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed

const app = express()

const config = {
  channelAccessToken: 'F4ptH38wFe7cYDr7B+0L+GxHxFDEixnLmeNIF5d+NYzh2ne0QgFNTNeceqyz95dwe+TW7DaVgb/qWr4RC9+M+xLFgCGx/BRF8UVaaHU1T1zIv/OqFUWytzW3mzZGbh0MiBqcLb0IJMqj30vQHWt7fgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'fe7d4b6ce4b6fb904bf6fc0861ca26bb'
}

app.use(middleware(config))

app.post('/webhook', (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
})

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

app.listen(8080)
