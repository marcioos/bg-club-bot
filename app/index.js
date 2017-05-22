const express = require('express')
const { fetchBggProposalData } = require('./bgg')
const { getRulesVideoUrl } = require('./you-tube.js')
require('dotenv').config()

const app = express()

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

app.listen(3000, () => console.log('bg-club-bot started on port 3000'))
