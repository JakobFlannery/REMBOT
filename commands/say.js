const chalk = require('chalk')
const settings = require('../config.json')

exports.run = function(client, message, args) {
    if (message.author == settings.adminid) {
            let param = args.join(' ')
            console.log(chalk.bgRed('Say Command Used!'))
            message.channel.send(param)
        } else {
            message.channel.send(`SPY!  ${message.author}`)
        }    
}