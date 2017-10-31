const Discord = require('discord.js');
const fs = require('fs');
const randomPuppy = require('random-puppy');
const client = new Discord.Client();
const config = require('./config.json');
const words = require('./databases/wordbank.json');
const blacklist = require('./databases/blacklist.json');
let user = JSON.parse(fs.readFileSync("./databases/userinfo.json", "utf8"));
let userlist = JSON.parse(fs.readFileSync("./databases/thelist.json", "utf8"));
require('./util/eventLoader')(client);

function picture(msg){
    var xxx = true;
    for (var pervert = 0; pervert < (blacklist.perverts).length; pervert++){
        if (blacklist.perverts[pervert] == msg) {
            xxx = false;
            client.guilds.get(settings.main_channel).channels.get(settings.main_text).send(`${msg} PERVERT!`);
        }
    }
    for (var victim = 0; victim < (blacklist.victims).length; victim++){
        if (blacklist.victims[victim] == msg) {
            xxx = false;
            var sub = userlist.nsfw[(Math.floor(Math.random()*(userlist.nsfw).length())];
            randomPuppy(sub)
            .then(url => {
                console.log(url);
                client.guilds.get(settings.main_channel).channels.get(settings.main_text).send(`${msg} Seems to have requested this? ...\n${url}`);
            })
        }
    }
    for (var ally = 0; ally < (blacklist.allies).length; ally++){
        if (blacklist.allies[ally] == msg) {
            xxx = false;
            var sub = userlist.sfw[(Math.floor(Math.random()*(userlist.sfw).length()))];
            randomPuppy(sub)
            .then(url => {
                console.log(url);
                client.guilds.get(settings.main_channel).channels.get(settings.main_text).send(`${msg} Something to cheer you up!!\n${url}`);
            })
        }
    }
    for (var other = 0; other < (userlist.users).length; other++){
        if (userlist.users[other] == msg && xxx){
            var sub = userlist.sfw[(Math.floor(Math.random()*(userlist.sfw).length()))];
            randomPuppy(sub)
            .then(url => {
                console.log(url);
                client.guilds.get(settings.main_channel).channels.get(settings.main_text).send(`${msg} Have a picture!\n${url}`);
            })
        }
    }
}

//Yells at Author if message insults oneself
client.on("message", message => {
    check = true;
    msg = (message.content).toLowerCase()
    for (var name = 0; name < (words.rem).length && check; name++) {
        if (msg.indexOf(words.rem[name]) > -1) {
            for (var word = 0; word < (words.bad).length && check; word++) {
                if (msg.indexOf(words.bad[word]) > -1) {
                    if (msg.indexOf("not") == -1 && msg.indexOf("isn't") == -1 && msg.indexOf("^") == -1) {
                        message.reply('LIES!');
                        check = false;
                    }
                }
            }
        }
    }
})

//FINISH?
client.on("message", message => {
    if (!user[message.author.id])
    {
        user[message.author.id] = {"coins": 0, "streak": 0, "pervertcount": 0/*, etc*/};
        userlist[users].push(message.author.id);
    }
    let userData = user[message.author.id];
    userData.coins += 1; // Gain 1 point per message
})

//Manages message streak count and message count
client.on("message", message => {
    let userData = user[message.author.id];
    userData.streak += 1;
    if (userData.coins > 20) {
        if (userData.streak > 3) {
            for (var username = 0; username < (userlist.users).length; username++){
                let newUserData = user[userlist.users[username]];
                if (user[userlist.users[username]] != message.author.id) {
                    newUserData.coins -= 1;
                    newUserData.streak = 0;
                }
            }
        }
    }
//Messages a link or such if user meets the criteria
    if (userData.coins > 10) {
        if (Math.floor(Math.random()*(userData.streak / userData.streak**2 * 20)) == 1) {
            picture(message.author);
        } else if (Math.floor(Math.random()*(userData.coins / userData.coins**2 * 400)) == 1) {
            picture(message.author);
        }
    }
})

client.login(config.token)