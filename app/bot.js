const { fetchBggProposalData } = require('./bgg')
const { getRulesVideoUrl } = require('./you-tube.js')

module.exports = {
  proposeExact: async (bggId) => {
    const bggData = await fetchBggProposalData(bggId)
    const rulesVideoUrl = await getRulesVideoUrl(bggData.gameName)
    return Object.assign(bggData, { rulesVideoUrl })
  }
}
