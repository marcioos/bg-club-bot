const express = require('express')
const bodyParser = require('body-parser')
const bot = require('./bot.js')
const telegram = require('./telegram.js')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.post('/' + process.env.TELEGRAM_BOT_TOKEN, async (req, res) => {
  try {
    // TODO: ignore if update_id was already processed
    const message = req.body.message
    const commandRegexp = /^\/propose (.*)$/i
    if (message && commandRegexp.test(message.text)) {
      const match = message.text.match(commandRegexp)
      const proposalText = await bot.proposeExact(match[1].trim())

      res.set('Content-Type', 'application/json')
      res.status(200).send(JSON.stringify({
        method: 'sendMessage',
        chat_id: message.chat.id,
        text: proposalText,
        parse_mode: 'Markdown'
      }))
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
