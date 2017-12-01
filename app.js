const Discord = require('discord.js');
const fs = require('fs');
const randomPuppy = require('random-puppy');
const client = new Discord.Client();
const settings = require('./config.json');
const sql = require("sqlite");
let thelist = JSON.parse(fs.readFileSync("./databases/thelist.json", "utf8"));
require('./util/eventLoader')(client);
sql.open("./databases/userdata.sqlite");

function picture(msg) {
    sql.get(`SELECT * FROM users WHERE id = "${msg.author.id}" AND guild = "${msg.guild.id}"`).then(sData => {
        //PERVS//
        if (sData.status == "Pervert") {
            sql.run(`UPDATE users SET pervcount = ${sData.pervcount + 1} WHERE id = "${msg.author.id}" AND guild = "${msg.guild.id}"`);
            sql.run(`UPDATE users SET totalperv = ${sData.totalperv + 1} WHERE id = "${msg.author.id}" AND guild = "${msg.guild.id}"`);
            if (sData.channel == "FALSE")
                {return;}
            if (sData.channel != "DM") {
                client.channels.get(sData.channel).send(`<@${msg.author.id}> PERVERT!`);
                return;
            }
            msg.author.send(`<@${msg.author.id}> PERVERT!`);
        }
        //VICTIMS//
        if (sData.status == "Victim") {
            if (Math.floor(Math.random()*(sData.pervcount / Math.pow(sData.pervcount, 2) * 100)) == 1) {
                var sub = thelist.nsfw[(Math.floor(Math.random()*(thelist.nsfw).length))];
                sql.run(`UPDATE users SET pervcount = ${sData.pervcount + 1} WHERE id = "${msg.author.id}" AND guild = "${msg.guild.id}"`);
                sql.run(`UPDATE users SET totalperv = ${sData.totalperv + 1} WHERE id = "${msg.author.id}" AND guild = "${msg.guild.id}"`);
            } else
                {var sub = thelist.sfw[(Math.floor(Math.random()*(thelist.sfw).length))];}
            randomPuppy(sub)
            .then(url => {
                console.log(url);
                if (sData.channel == "FALSE")
                    {return;}
                if (sData.channel != "DM") {
                    client.channels.get(sData.channel).send(`<@${msg.author.id}> Seems to have requested this? ...\n${url}`);
                    return;
                }
                msg.author.send(`<@${msg.author.id}> Seems to have requested this? ...\n${url}`);
            })
        }
        //FRIENDS//
        if (sData.status == "Friend") {
            var sub = thelist.sfw[(Math.floor(Math.random()*(thelist.sfw).length))];
            randomPuppy(sub)
            .then(url => {
                console.log(url);
                if (sData.channel == "FALSE")
                    {return;}
                if (sData.channel != "DM") {
                    client.channels.get(sData.channel).send(`<@${msg.author.id}> Something to cheer you up!!\n${url}`);
                    return;
                }
                msg.author.send(`<@${msg.author.id}> Something to cheer you up!!\n${url}`);
            })
        }
    });
}



/*Everytime User Messages*/
client.on("message", message => {
    if (message.author.bot || message.channel.type == "dm")
        {return;}

    //Add New Users//
    sql.get(`SELECT * FROM servers WHERE id = "${message.guild.id}"`).then(data => {
        if (!data) {
            var usernum = 0;
            sql.run("INSERT INTO servers (id, channel, defaultstatus, msghigh, streakhigh, usernum) VALUES (?, ?, ?, ?, ?, ?)", [`${message.guild.id}`, "DM", "Friend", 20, 3, 1]);
        } else {
            var usernum = data.usernum;
            sql.run(`UPDATE servers SET usernum = ${data.usernum + 1} WHERE id = "${message.guild.id}"`);
        }
    }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS servers (id TEXT, channel TEXT, defaultstatus TEXT, msghigh INTEGER, streakhigh INTEGER, usernum INTEGER)").then(() => {
            sql.run("INSERT INTO servers (id, channel, defaultstatus, msghigh, streakhigh, usernum) VALUES (?, ?, ?, ?, ?, ?)", [`${message.guild.id}`, "DM", "Friend", 20, 3, 1]);
        });
    });
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`).then(data => {
        if (!data) {
            sql.get(`SELECT * FROM servers WHERE id = "${message.guild.id}"`).then(newData => {
                sql.run("INSERT INTO users (id, guild, status, msgcount, totalmsg, streak, highstreak, pervcount, totalperv, channel, num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [`${message.author.id}`, `${message.guild.id}`, `${newData.defaultstatus}`, 1, 1, 1, 1, 0, 0, `${newData.channel}`, usernum]);
            });
        } else {
            sql.run(`UPDATE users SET msgcount = ${data.msgcount + 1} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
            sql.run(`UPDATE users SET totalmsg = ${data.totalmsg} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
            sql.run(`UPDATE users SET streak = ${data.streak + 1} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
            if (data.streak > data.highstreak)
                {sql.run(`UPDATE users SET highstreak = ${data.streak} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);}
        }
    }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS users (id TEXT, guild TEXT, status TEXT, msgcount INTEGER, totalmsg INTEGER, streak INTEGER, highstreak INTEGER, pervcount INTEGER, totalperv INTEGER, channel TEXT, num INTEGER)").then(() => {
            sql.run("INSERT INTO users (id, guild, status, msgcount, totalmsg, streak, highstreak, pervcount, totalperv, channel, num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [`${message.author.id}`, `${message.guild.id}`, "Friend", 1, 1, 1, 1, 0, 0, "DM", 0]);
        });
    });

    //Manage Other User's Points//
    sql.get(`SELECT * FROM servers WHERE id = "${message.guild.id}"`).then(data => {
        for (var userid = 0; userid < (usernum + 1); userid++)
        {
            sql.get(`SELECT * FROM users WHERE num = ${userid} AND guild = "${message.guild.id}"`).then(newData => {
                if (newData.id != `${message.author.id}` && newData.msgcount > data.msghigh && newData.streak > data.streakhigh) {
                    if (newData.msgcount > 0)
                        {sql.run(`UPDATE users SET msgcount = ${newData.msgcount - 1} WHERE num = ${userid} AND guild = "${message.guild.id}"`);}
                    if ((Math.floor(Math.random()*(newData.pervcount)) < (newData.pervcount / (newData.pervcount / Math.pow(newData.pervcount, 2) * 200))))
                        {sql.run(`UPDATE users SET pervcount = ${newData.pervcount - 1} WHERE num = ${userid} AND guild = "${message.guild.id}"`);}
                    sql.run(`UPDATE users SET streak = 0 WHERE num = ${userid} AND guild = "${message.guild.id}"`);
                }
            });
        }
    });

    //Messages Random Image Sometimes//
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`).then(data => {
        if (data.msgcount > 0) {
            if (Math.floor(Math.random()*(data.streak / Math.pow(data.streak, 2) * 20)) == 1 || Math.floor(Math.random()*(data.msgcount / Math.pow(data.msgcount, 2) * 400)) == 1)
                {picture(message);}
        }
    });

    //Manages User Status//
    if (`${message.guild.id}` == settings.tomserver) {
        sql.get(`SELECT * FROM servers WHERE id = "${message.guild.id}"`).then(data => {
            for (var userid = 0; userid < (usernum + 1); userid++) {
                sql.get(`SELECT * FROM users WHERE num = ${userid} AND guild = "${message.guild.id}"`).then(newData => {
                    //VICTIMS//
                    if (newData.status == "Victim" && newData.pervcount > 10) {
                        //Manage Role//
                        let myRole = message.guild.roles.find("name", "SUPA-UPA-DUPA-CREEPZ");
                        let member = newData.id;
                        member.addRole(myRole);
                        //Manage Status//
                        sql.run(`UPDATE users SET status = "Pervert" WHERE id = ${newData.id} AND guild = "${message.guild.id}"`);
                    }
                    //PERVERTS//
                    if (newData.status == "Pervert" && newData.pervcount < 5) {
                        //Manage Role//
                        let myRole = message.guild.roles.find("name", "SUPA-UPA-DUPA-CREEPZ");
                        let member = newData.id;
                        member.removeRole(myRole);
                        //Manage Status//
                        sql.run(`UPDATE users SET status = "Victim" WHERE id = ${newData.id} AND guild = "${message.guild.id}"`);
                    }
                });
            }
        });
    }
});

client.login(settings.token)