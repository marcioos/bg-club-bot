const express = require('express')
const { fetchBggProposalData } = require('./bgg')
const { getRulesVideoUrl } = require('./you-tube.js')
const app = express()

app.post('/propose/:bggId', (req, res) => {
  let proposalData
  fetchBggProposalData(req.params.bggId)
    .then((bggData) => {
      proposalData = Object.assign({}, bggData)
      return getRulesVideoUrl(bggData.name)
    })
    .then((rulesVideoUrl) => {
      proposalData.rulesVideoUrl = rulesVideoUrl
      res.setHeader('Content-Type', 'text/plain')
      res.send(JSON.stringify(proposalData, null, '\t'))
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error ' + err)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
