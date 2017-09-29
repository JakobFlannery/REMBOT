const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const words = require('./wordbank.json')
require('./util/eventLoader')(client)

client.on("message", message => {
    for (var name = 0; name < (words.rem).length; name++) {
        for (var word = 0; word < (words.bad).length; word++) {
            insult = `${words.rem[name]} is ${words.bad[word]}`
            if ((message.content).toLowerCase() === insult){
                message.reply('LIES!')
        }
    }
    }
})

client.login(config.token)