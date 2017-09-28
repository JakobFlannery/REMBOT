const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
require('./util/eventLoader')(client)

client.on("message", message => {
    if (message.content === "Rem is bad"){
        message.reply('LIES!')
    }
})

client.login(config.token)