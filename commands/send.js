const chalk = require('chalk');
const settings = require('../config.json');

exports.run = function(client, message, args) {
    if (message.author == settings.adminid) {
        console.log(chalk.bgRed('Send Command Used!'))
        let result = args.join(' ')

        // Stores the server id into a serperate string
        var server = result.split(" ")

        // So the message is neat.
        var messagePrep = server.toString()
        var message = messagePrep.replace(/,/g , " ")
        // As it is an array converted to a string I must replace the commas with spaces!
        message = message.substr(message.indexOf(" ") + 1)
        // Removes the server ID.

        // Actually sends the message, yay.
        client.channels.get(server[0]).send(message);
    }
};