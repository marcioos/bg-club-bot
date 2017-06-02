const express = require('express')
const bodyParser = require('body-parser')
const { fetchBggProposalData } = require('./bgg')
const { getRulesVideoUrl } = require('./you-tube.js')
const telegram = require('./telegram.js')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.post('/' + process.env.TELEGRAM_BOT_TOKEN, (req, res) => {
  console.log('Request body', req.body)
  console.log('entities', req.body.message.entities)
  res.send('OK')
})

app.post('/propose/:bggId', async (req, res) => {
  try {
    const bggData = await fetchBggProposalData(req.params.bggId)
    const rulesVideoUrl = await getRulesVideoUrl(bggData.gameName)
    const proposalData = Object.assign(bggData, { rulesVideoUrl })
    res.setHeader('Content-Type', 'application/json')
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
