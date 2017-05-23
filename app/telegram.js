const axios = require('axios')

const REQUEST_TIMEOUT_MS = 10000

const httpClient = axios.create({
  baseURL: 'https://api.telegram.org',
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json'
  }
})

module.exports = {
  setWebhook: () => {
    return httpClient
      .post(`/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook`, {
        url: `https://bg-club-bot.herokuapp.com/${process.env.TELEGRAM_BOT_TOKEN}`
      })
      .then((res) => {
        if (res.data.ok && res.data.result) {
          console.log('Telegram webhook successfully set')
        } else {
          console.error('Failed to set Telegram webhook')
        }
      })
      .catch((err) => {
        console.error('Failed to set Telegram webhook')
      })
  }
}
