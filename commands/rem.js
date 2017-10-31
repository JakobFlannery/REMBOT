const chalk = require('chalk');

exports.run = function(client, message, args) {
    console.log(chalk.bgBlue('Rem Command Used!'));
    message.channel.send(`Rem!`);
}