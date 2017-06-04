const { fetchBggProposalData } = require('./service/bgg')
const { getRulesVideoUrl } = require('./service/you-tube')

async function fetchProposalData (bggId) {
  const bggData = await fetchBggProposalData(bggId)
  const rulesVideoUrl = await getRulesVideoUrl(bggData.gameName)
  return Object.assign(bggData, { rulesVideoUrl })
}

function toProposalText (data) {
  const text = [`*${data.gameName}*`]
  if (data.numPlayers) {
    text.push(`\n${data.numPlayers}`)
  }
  if (data.playTime) {
    text.push(`\n${data.playTime}`)
  }
  text.push(`\n\n*BGG*\n${data.bggUrl}\n\n*Rules*\n${data.rulesVideoUrl}`)
  return text.join("")
}

module.exports = {
  proposeExact: async (bggId) => {
    const proposalData = await fetchProposalData(bggId)
    return toProposalText(proposalData)
  }
}
