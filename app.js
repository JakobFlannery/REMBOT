const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const words = require('./wordbank.json');
require('./util/eventLoader')(client);

client.on("message", message => {
    check = true;
    msg = (message.content).toLowerCase()
    for (var name = 0; name < (words.rem).length && check; name++) {
        if (msg.indexOf(words.rem[name]) > -1) {
            for (var word = 0; word < (words.bad).length && check; word++) {
                if (msg.indexOf(words.bad[word]) > -1) {
                    if (msg.indexOf("not") == -1 && msg.indexOf("isn't") == -1 && msg.indexOf("Remu*") == -1) {
                        message.reply('LIES!');
                        check = false;
                    }
                }
            }
        }
    }
})

client.login(config.token);