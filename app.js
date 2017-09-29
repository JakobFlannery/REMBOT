const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const words = require('./wordbank.json')
require('./util/eventLoader')(client)

client.on("message", message => {
    for (var name = 0; i < (words.rem).length; name++) {
        for (var word = 0; i < (words.bad).length; word++) {
            insult = `${name} is ${word}`
            if ((message.content).toLowerCase() === insult){
                message.reply('LIES!')
        }
    }
    }
})

client.login(config.token)