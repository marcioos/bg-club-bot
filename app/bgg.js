const bggClient = require('bgg-axios')

module.exports = {
  fetchBggProposalData: (bggId) => {
    return bggClient.apiRequest('thing', { id: bggId })
      .then((bggResponse) => {
        const game = bggResponse.items.item
        const minPlayers = game.minplayers.value
        const maxPlayers = game.maxplayers.value
        const playingTime = game.playingtime.value
        const minPlayTime = game.minplaytime.value
        const maxPlayTime = game.maxplaytime.value

        return {
          gameName: game.name.value,
          numPlayers: minPlayers !== maxPlayers ? `${minPlayers}-${maxPlayers}` : maxPlayers,
          playTime: (minPlayTime !== maxPlayTime ? `${minPlayTime}-${maxPlayTime}` : playingTime) + ' min',
          bggUrl: `https://boardgamegeek.com/boardgame/${bggId}`
        }
      })
  }
}
