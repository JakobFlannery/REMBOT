const Discord = require('discord.js');
const fs = require('fs');
const randomPuppy = require('random-puppy');
const client = new Discord.Client();
const settings = require('./config.json');
const words = require('./databases/wordbank.json');
let blacklist = JSON.parse(fs.readFileSync("./databases/blacklist.json", "utf8"));
let user = JSON.parse(fs.readFileSync("./databases/userinfo.json", "utf8"));
let userlist = JSON.parse(fs.readFileSync("./databases/thelist.json", "utf8"));
require('./util/eventLoader')(client);

// Array Remove - By John Resig (MIT Licensed) 
Array.prototype.remove = function(from, to) { 
    var rest = this.slice((to || from) + 1 || this.length);  //var rest = this.slice(parseInt(to || from) + 1 || this.length); 
    this.length = from < 0 ? this.length + from : from; 
    return this.push.apply(this, rest); 
};

//Adds to 'pervertcount'
function upstuff(auth)
{
    let userData = user[auth];
    userData.pervertcount += 1;
    fs.writeFile("./databases/userinfo.json", JSON.stringify(user), (err) => {
        if (err) console.error(err)
    });
}

//Posts a message dependant on user 'alignment'
function picture(auth)
{
    var xxx = true;
    for (var perv = 0; perv < (blacklist.perverts).length; perv++)//CHECK
    {
        if (blacklist.perverts[perv] == auth)
        {
            xxx = false;
            upstuff(auth);
            client.channels.get(settings.main_text).send(`<@${auth}> PERVERT!`);
        }
    }
    for (var vic = 0; vic < (blacklist.victims).length; vic++)//CHECK
    {
        if (blacklist.victims[vic] == auth)
        {
            xxx = false;
            upstuff(auth);
            var sub = userlist.nsfw[(Math.floor(Math.random()*(userlist.nsfw).length))];//CHECK
            randomPuppy(sub)
            .then(url => {
                console.log(url);
                client.channels.get(settings.main_text).send(`<@${auth}> Seems to have requested this? ...\n${url}`);
            })
        }
    }
    for (var ally = 0; ally < (blacklist.allies).length; ally++)//CHECK
    {
        if (blacklist.allies[ally] == auth)
        {
            xxx = false;
            var sub = userlist.sfw[(Math.floor(Math.random()*(userlist.sfw).length))];//CHECK
            randomPuppy(sub)
            .then(url => {
                console.log(url);
                client.channels.get(settings.main_text).send(`<@${auth}> Something to cheer you up!!\n${url}`);
            })
        }
    }
    if (xxx)
    {
        for (var other = 0; other < (userlist.users).length; other++)//CHECK
        {
            if (userlist.users[other] == auth)
            {
                var sub = userlist.sfw[(Math.floor(Math.random()*(userlist.sfw).length))];//CHECK
                randomPuppy(sub)
                .then(url => {
                    console.log(url);
                    client.channels.get(settings.main_text).send(`<@${auth}> Have a picture!\n${url}`);
                })
            }
        }
    }
}

/*Manages point systems*/
client.on("message", message => {
    //Adds points to msgcount and creates new user data if needed
    if (message.author.bot)
    {return;}
    if (!user[message.author.id])
    {
        user[message.author.id] = {msgcount: 0, streak: 0, pervertcount: 0};
        userlist.users[(userlist.users).length] = message.author.id;//CHECK
    }
    let userData = user[message.author.id];
    userData.msgcount += 1;
    userData.streak += 1;
    //Manages pervertcount and msgcount for others
    if (userData.msgcount > 20)
    {
        if (userData.streak > 3)
        {
            for (var userid = 0; userid < (userlist.users).length; userid++)//CHECK
            {
                if (userlist.users[userid] != message.author.id)
                {
                    let newUserData = user[userlist.users[userid]];//CHECK
                    if (newUserData.msgcount > 0)
                    {newUserData.msgcount -= 1;}
                    if ((Math.floor(Math.random()*(newUserData.pervertcount)) < (newUserData.pervertcount / (newUserData.pervertcount / Math.pow(newUserData.pervertcount, 2) * 200))) && (newUserData.pervertcount > 0))
                    {newUserData.pervertcount -= 1;}
                }
            }
        }
    }
    //Resets others' streak
    for (var userid = 0; userid < (userlist.users).length; userid++)//CHECK
    {
        if (userlist.users[userid] != message.author.id)
        {
            let newUserData = user[userlist.users[userid]];//CHECK
            newUserData.streak = 0;
        }
    }
    fs.writeFile("./databases/userinfo.json", JSON.stringify(user), (err) => {
        if (err) console.error(err)
    });
    fs.writeFile("./databases/thelist.json", JSON.stringify(userlist), (err) => {
        if (err) console.error(err)
    });
});

/*Messages a random image sometimes...*/
client.on("message", message => {
    if (message.author.bot)
    {return;}
    let userData = user[message.author.id];
    if (userData.msgcount > 10)
    {
        if (Math.floor(Math.random()*(userData.streak / Math.pow(userData.streak, 2) * 20)) == 1)
        {picture(message.author.id);}
        else if (Math.floor(Math.random()*(userData.msgcount / Math.pow(userData.msgcount, 2) * 1000)) == 1)
        {picture(message.author.id);}
    }
});

/*Manages 'alignment' of users*/
client.on("message", message => {
    if (message.author.bot)
    {return;}
    if ((blacklist.victims).indexOf(message.author.id) > -1)//CHECK
    {
        for (var vic = 0; vic < (blacklist.victims).length; vic++)//CHECK
        {
            if (user[blacklist.victims[vic]].msgcount > 10)//CHECK
            {
                let myRole = message.guild.roles.find("name", "SUPA-UPA-DUPA-CREEPZ");
                let member = blacklist.victims[vic];
                member.addRole(myRole);
                //Change blacklist status
                let bl = blacklist;
                var ind = bl.victims.indexOf(member);
                bl.remove(ind);//CHECK
                bl.perverts[(bl.perverts).length] = member;//CHECK
            }
        }
    }
    else if ((blacklist.perverts).indexOf(message.author.id) > -1)//CHECK
    {
        for (var perv = 0; perv < (blacklist.perverts).length; perv++)//CHECK
        {
            if (blacklist.perverts[perv] != blacklist.jackson)
            {
                if (user[blacklist.perverts[perv]].msgcount < 5)//CHECK
                {
                    let myRole = message.guild.find("name", "SUPA-UPA-DUPA-CREEPZ");
                    let member = blacklist.perverts[perv];
                    member.removeRole(myRole);
                    //Change blacklist status
                    let bl = blacklist;
                    var ind = bl.perverts.indexOf(member);
                    bl.remove(ind);//CHECK
                    bl.victims[(bl.victims).length] = member;//CHECK
                }
            }
        }
    }
    else if ((blacklist.allies).indexOf(message.author.id) == -1)//CHECK
    {
        let newUser = blacklist.victims;
        newUser[(blacklist.victims).length] = message.author.id;//CHECK
    }
    fs.writeFile("./databases/thelist.json", JSON.stringify(userlist), (err) => {
        if (err) console.error(err)
    });
});

client.login(settings.token)