const express = require('express')
const bodyParser = require('body-parser')
const { fetchBggProposalData } = require('./bgg')
const { getRulesVideoUrl } = require('./you-tube.js')
const telegram = require('./telegram.js')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.post('/' + process.env.TELEGRAM_BOT_TOKEN, async (req, res) => {
  // TODO: ignore if update_id was already processed
  const message = req.body.message
  const commandRegexp = /^\/propose (.*)$/i
  if (message && commandRegexp.test(message.text)) {
    const match = message.text.match(commandRegexp)
    const proposeArg = match[1].trim()
    const chatId = message.chat.id

    // WIP: duplicated code
    try {
      const bggData = await fetchBggProposalData(proposeArg)
      const rulesVideoUrl = await getRulesVideoUrl(bggData.gameName)
      const proposalData = Object.assign(bggData, { rulesVideoUrl })
      res.set('Content-Type', 'application/json')
      res.status(200).send(JSON.stringify({method: 'sendMessage', chat_id: chatId, text: proposalData}))
    } catch (err) {
      console.error(err)
      res.status(500).send('Error ' + err)
    }
  }
  res.send('OK')
})

app.post('/propose-exact/:bggId', async (req, res) => {
  try {
    const bggData = await fetchBggProposalData(req.params.bggId)
    const rulesVideoUrl = await getRulesVideoUrl(bggData.gameName)
    const proposalData = Object.assign(bggData, { rulesVideoUrl })
    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify(proposalData, null, '\t'))
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
