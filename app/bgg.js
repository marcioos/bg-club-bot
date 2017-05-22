const bggClient = require('bgg-axios')

module.exports = {
  fetchBggProposalData: function (bggId) {
    return bggClient.apiRequest('thing', { id: bggId })
      .then((bggResponse) => {
        const game = bggResponse.items.item
        const minPlayers = game.minplayers.value
        const maxPlayers = game.maxplayers.value
        const playingTime = game.playingtime.value
        const minPlayTime = game.minplaytime.value
        const maxPlayTime = game.maxplaytime.value

        return {
          name: game.name.value,
          numPlayers: minPlayers !== maxPlayers ? `${minPlayers}-${maxPlayers}` : maxPlayers,
          playTime: (minPlayTime !== maxPlayTime ? `${minPlayTime}-${maxPlayTime}` : playingTime) + ' min',
          url: `https://boardgamegeek.com/boardgame/${bggId}`
        }
      })
  }
}
