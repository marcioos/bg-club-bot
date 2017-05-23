const axios = require('axios')

const REQUEST_TIMEOUT_MS = 10000

const httpClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  timeout: REQUEST_TIMEOUT_MS,
})

module.exports = {
  getRulesVideoUrl: (gameName) => {
    const queryTerm = encodeURI(`${gameName} rules`)
    return httpClient
      .get(`/search?q=${queryTerm}&part=snippet&maxResults=1&key=${process.env.GOOGLE_API_KEY}`)
      .then((response) => {
        const videoId = response.data.items[0].id.videoId
        return `https://www.youtube.com/watch?v=${videoId}`
      })
  }
}
