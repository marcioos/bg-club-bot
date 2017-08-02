const proposal = require('./proposal')

const COMMAND_REGEXP = /^\/propose (.*)$/i

module.exports = async function (message) {
  if (message && COMMAND_REGEXP.test(message.text)) {
    const match = message.text.match(COMMAND_REGEXP)
    const responseMessageText = await proposal.proposeExact(match[1].trim())
    return {
      method: 'sendMessage',
      chat_id: message.chat.id,
      text: responseMessageText,
      parse_mode: 'Markdown'
    }
  }
  return null
}
