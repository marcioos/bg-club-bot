const bggClient = require('bgg-axios')

function getGameName (game) {
  if (Array.isArray(game.name)) {
    return game.name
      .filter((name) => name.type === 'primary')
      .map((name) => name.value)[0]
  }
  return game.name.value
}

function getNumPlayers (game) {
  const minPlayers = game.minplayers.value
  const maxPlayers = game.maxplayers.value
  if (minPlayers === '0' && maxPlayers === '0') {
    return null
  }
  return (minPlayers !== maxPlayers ? `${minPlayers}-${maxPlayers}` : maxPlayers) + ' players'
}

function getPlayTime (game) {
  const playingTime = game.playingtime.value
  const minPlayTime = game.minplaytime.value
  const maxPlayTime = game.maxplaytime.value
  if (minPlayTime === '0' && maxPlayTime === '0' && playingTime === '0') {
    return null
  }
  return (minPlayTime !== maxPlayTime ? `${minPlayTime}-${maxPlayTime}` : playingTime) + ' min'
}

module.exports = {
  fetchBggProposalData: (bggId) => {
    return bggClient.apiRequest('thing', { id: bggId })
      .then((bggResponse) => {
        if (!bggResponse.items) {
          return null
        }
        const game = bggResponse.items.item
        return {
          gameName: getGameName(game),
          numPlayers: getNumPlayers(game),
          playTime: getPlayTime(game),
          bggUrl: `https://boardgamegeek.com/boardgame/${bggId}`
        }
      })
  }
}
