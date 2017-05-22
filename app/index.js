const express = require('express')
const { fetchBggProposalData } = require('./bgg')
const { getRulesVideoUrl } = require('./you-tube.js')
const app = express()

app.post('/propose/:bggId', async (req, res) => {
  let proposalData, bggData
  try {
    bggData = await fetchBggProposalData(req.params.bggId)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error ' + err)
  }

  proposalData = Object.assign({}, bggData)
  try {
    proposalData.rulesVideoUrl = await getRulesVideoUrl(bggData.name)
  } catch(err) {
    console.error('Youtube fetch failed: ')
    console.error(err)
  }
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(proposalData, null, '\t'))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
