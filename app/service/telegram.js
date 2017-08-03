const config = require('../config')
const axios = require('axios')

const REQUEST_TIMEOUT_MS = 10000

const httpClient = axios.create({
  baseURL: 'https://api.telegram.org',
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json'
  }
})

function postToTelegram (endpoint, payload) {
  return httpClient
    .post(endpoint, payload)
    .then((res) => {
      if (res.data.ok && res.data.result) {
        console.log(`Got 'ok' from Telegram endpoint: ${endpoint}`)
      } else {
        console.error(`Got bad response from Telegram endpoint ${endpoint}. Response data: ${JSON.stringify(res.data)}`)
      }
    })
    .catch((err) => {
      console.error(`Failed while sending request to Telegram endpoint ${endpoint} with payload ${JSON.stringify(payload)}`)
      console.error(err)
    })
}

function setWebhook () {
  return postToTelegram(`/bot${config.TELEGRAM_BOT_TOKEN}/setWebhook`, {
    url: `https://bg-club-bot.herokuapp.com/${config.TELEGRAM_BOT_TOKEN}`
  })
}

module.exports = { setWebhook }
