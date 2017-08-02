const axios = require('axios')

const REQUEST_TIMEOUT_MS = 10000

const httpClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  timeout: REQUEST_TIMEOUT_MS,
})

function getRulesVideoUrl (gameName) {
  const queryTerm = encodeURI(`how to play ${gameName} board game rules`)
  return httpClient
    .get(`/search?q=${queryTerm}&part=snippet&maxResults=1&key=${process.env.GOOGLE_API_KEY}`)
    .then((response) => {
      const video = response.data.items[0]
      return video ? `https://www.youtube.com/watch?v=${video.id.videoId}` : null
    })
}

module.exports = { getRulesVideoUrl }
