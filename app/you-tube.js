const axios = require('axios')

const REQUEST_TIMEOUT_MS = 10000

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  timeout: REQUEST_TIMEOUT_MS,
})

module.exports = {
  getRulesVideoUrl: function (gameName) {
    const queryTerm = encodeURI(`${gameName} rules`)

    return axiosInstance.get(`/search?q=${queryTerm}&part=snippet&maxResults=1`)
  }
}
