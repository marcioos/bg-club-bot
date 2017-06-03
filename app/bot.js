const { fetchBggProposalData } = require('./bgg')
const { getRulesVideoUrl } = require('./you-tube.js')

async function fetchProposalData (bggId) {
  const bggData = await fetchBggProposalData(bggId)
  const rulesVideoUrl = await getRulesVideoUrl(bggData.gameName)
  return Object.assign(bggData, { rulesVideoUrl })
}

function toProposalText (data) {
  return `*${data.gameName}*\n${data.numPlayers}\n${data.playTime}\n\n*BGG*\n${data.bggUrl}\n\n*Rules*\n${data.rulesVideoUrl}`
}

module.exports = {
  proposeExact: async (bggId) => {
    const proposalData = await fetchProposalData(bggId)
    return toProposalText(proposalData)
  }
}
