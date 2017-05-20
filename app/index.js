const express = require('express')
const bgg = require('bgg-axios')
const app = express()

app.post('/propose/:bggId', (req, res) => {
  bgg('thing', { id: req.params.bggId })
    .then((bggRes) => {
      res.setHeader('Content-Type', 'text/plain')
      res.send(JSON.stringify(bggRes, null, '\t'))
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error ' + err)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
