const chalk = require('chalk');
const settings = require('../config.json');

exports.run = function(client, message, args) {
    if ((settings.adminid).indexOf(message.author.id) > -1) {
        console.log(chalk.bgYellow('Send Command Used!'));
        let result = args.join(' ');
        var server = result.split(" ");
        var messagePrep = server.toString();
        var message = messagePrep.replace(/,/g , " ");
        message = message.substr(message.indexOf(" ") + 1);
        client.channels.get(server[0]).send(message);
    }
    else
    {message.channel.send(`Rem says no!  ${message.author}`);}
}