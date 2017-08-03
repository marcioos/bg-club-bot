require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const handleMessage = require('./handle-message')
const telegram = require('./service/telegram')
const config = require('./config')

const app = express()

app.use(bodyParser.json())

app.post('/' + config.TELEGRAM_BOT_TOKEN, async (req, res) => {
  try {
    const responseMessage = await handleMessage(req.body.message)
    if (responseMessage) {
      res.set('Content-Type', 'application/json')
      res.status(200).send(JSON.stringify(responseMessage))
    } else {
      res.status(200).send('OK')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error ' + err)
  }
})

app.listen(config.PORT, async () => {
  await telegram.setWebhook()
  console.log('bg-club-bot started on port ' + config.PORT)
})
