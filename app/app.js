const express = require('express')
const bodyParser = require('body-parser')
const handleMessage = require('./handle-message')
const telegram = require('./service/telegram')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.post('/' + process.env.TELEGRAM_BOT_TOKEN, async (req, res) => {
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

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  await telegram.setWebhook()
  console.log('bg-club-bot started on port ' + PORT)
})
