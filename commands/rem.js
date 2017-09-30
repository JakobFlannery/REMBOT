const chalk = require('chalk');

exports.run = function(client, message, args) {
    console.log(chalk.bgRed('Rem Command Used!'));
    message.channel.send(`Rem!`);
}