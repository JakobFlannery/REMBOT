const chalk = require('chalk')

exports.run = function(client, message, args) {
    console.log('REMBOT Command Used!')
}

exports.run = function(client, message, args) {
    console.log(chalk.bgRed('Ping Command Used!'))
    message.channel.send(`Rem!`)
}