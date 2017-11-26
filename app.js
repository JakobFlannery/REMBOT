const Discord = require('discord.js');
const fs = require('fs');
const randomPuppy = require('random-puppy');
const client = new Discord.Client();
const settings = require('./config.json');
const sql = require("sqlite");
let thelist = JSON.parse(fs.readFileSync("./databases/thelist.json", "utf8"));
require('./util/eventLoader')(client);
sql.open("./databases/userdata.sqlite");



function picture(auth){
    sql.get(`SELECT * FROM users WHERE id ="${auth}"`).then(sData => {
        //PERVS//
        if (sData.status == "Pervert") {
            sql.run(`UPDATE users SET pervcount = ${data.pervcount + 1} WHERE id = "${auth}"`);
            sql.run(`UPDATE users SET totalperv = ${data.totalperv + 1} WHERE id = "${auth}"`);
            client.channels.get(settings.main_text).send(`<@${sData.userid}> PERVERT!`);
        }
        //VICTIMS//
        if (sData.status == "Victim") {
            if (Math.floor(Math.random()*(sData.pervcount / Math.pow(sData.pervcount, 2) * 100)) == 1) {
            var sub = thelist.nsfw[(Math.floor(Math.random()*(thelist.nsfw).length))];
            sql.run(`UPDATE users SET pervcount = ${data.pervcount + 1} WHERE id = "${auth}"`);
            sql.run(`UPDATE users SET totalperv = ${data.totalperv + 1} WHERE id = "${auth}"`);
            }
            else
            {var sub = thelist.sfw[(Math.floor(Math.random()*(thelist.sfw).length))];}
            randomPuppy(sub)
            .then(url => {
                console.log(url);
                client.channels.get(settings.main_text).send(`<@${sData.userid}> Seems to have requested this? ...\n${url}`);
            })
        }
        //FRIENDS//
        if (sData.status == "Friend") {
            var sub = thelist.sfw[(Math.floor(Math.random()*(thelist.sfw).length))];//CHECK
            randomPuppy(sub)
            .then(url => {
                console.log(url);
                client.channels.get(settings.main_text).send(`<@${sData.userid}> Something to cheer you up!!\n${url}`);
            })
        }
    });
}



/*Everytime User Messages*/
client.on("message", message => {
    if (message.author.bot || message.channel.type == "dm")
        {return;}

    //Add New Users//
    sql.get(`SELECT * FROM users WHERE id ="${message.guild.id}${message.author.id}"`).then(data => {
        if (!data)
        {sql.run("INSERT INTO users (id, userid, status, msgcount, totalmsg, streak, highstreak, pervcount, totalperv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [`${message.guild.id}${message.author.id}`, `${message.author.id}`, "Victim", 1, 1, 1, 1, 0, 0]);}
        else {
            sql.run(`UPDATE users SET msgcount = ${data.msgcount + 1} WHERE id = "${message.guild.id}${message.author.id}"`);
            sql.run(`UPDATE users SET totalmsg = ${data.totalmsg + 1} WHERE id = "${message.guild.id}${message.author.id}"`);
            sql.run(`UPDATE users SET streak = ${data.streak + 1} WHERE id = "${message.guild.id}${message.author.id}"`);
            if (data.streak > data.highstreak)
            {sql.run(`UPDATE users SET highstreak = ${data.streak} WHERE id = "${message.guild.id}${message.author.id}"`);}
        }
    }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS users (id TEXT, userid TEXT, status TEXT, msgcount INTEGER, totalmsg INTEGER, streak INTEGER, highstreak INTEGER, pervcount INTEGER, totalperv INTEGER)").then(() => {
            sql.run("INSERT INTO users (id, userid, status, msgcount, totalmsg, streak, highstreak, pervcount, totalperv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [`${message.guild.id}${message.author.id}`, `${message.author.id}`, "Victim", 1, 1, 1, 1, 0, 0]);
        });
    });
    if ((thelist.users).indexOf(`${message.guild.id}${message.author.id}`) == -1) {
        thelist.users[(thelist.users).length] = `${message.guild.id}${message.author.id}`;//CHECK
        fs.writeFile("./databases/thelist.json", JSON.stringify(thelist), (err) => {
            if (err) console.error(err)
        });
    }

    //Manage Other User's Points//
    sql.get(`SELECT * FROM users WHERE id ="${message.guild.id}${message.author.id}"`).then(data => {
        for (var userid = 0; userid < (thelist.users).length; userid++)
        {
            if (thelist.users[userid] != `${message.guild.id}${message.author.id}`) {
                sql.get(`SELECT * FROM users WHERE id ="${message.guild.id}${message.author.id}"`).then(newData => {
                    if (data.msgcount > 20 && data.streak > 3) {
                        if (newData.msgcount > 0)
                        {sql.run(`UPDATE users SET msgcount = ${newData.msgcount - 1} WHERE id = "${thelist.users[userid]}"`);}
                        if ((Math.floor(Math.random()*(newData.pervcount)) < (newData.pervcount / (newData.pervcount / Math.pow(newData.pervcount, 2) * 200))) && (newData.pervcount > 0))
                        {sql.run(`UPDATE users SET pervcount = ${newData.pervcount - 1} WHERE id = "${thelist.users[userid]}"`);}
                    }
                    sql.run(`UPDATE users SET streak = ${newData.streak * 0} WHERE id = "${thelist.users[userid]}"`);
                });
            }
        }
    });

    //Messages Random Image Sometimes//
    sql.get(`SELECT * FROM users WHERE id ="${message.guild.id}${message.author.id}"`).then(data => {
        if (data.msgcount > 10) {
            if (Math.floor(Math.random()*(data.streak / Math.pow(data.streak, 2) * 20)) == 1 || Math.floor(Math.random()*(data.msgcount / Math.pow(data.msgcount, 2) * 400)) == 1)
            {picture(data.id);}
        }
    });

    //Manages User Status//
    for (var userid = 0; userid < (thelist.users).length; userid++)
    {
        sql.get(`SELECT * FROM users WHERE id ="${thelist.users[userid]}"`).then(data => {
            //VICTIMS//
            if (data.status == "Victim" && data.pervcount > 10) {
                //Manage Role//
                let myRole = message.guild.roles.find("name", "SUPA-UPA-DUPA-CREEPZ");
                let member = data.userid;
                member.addRole(myRole);
                //Manage Status//
                sql.run(`UPDATE users SET status = "Pervert" WHERE id = "${data.id}"`);
            }
            //PERVERTS//
            if (data.status == "Pervert" && data.pervcount < 5) {
                //Manage Role//
                let myRole = message.guild.roles.find("name", "SUPA-UPA-DUPA-CREEPZ");
                let member = data.userid;
                member.removeRole(myRole);
                //Manage Status//
                sql.run(`UPDATE users SET status = "Victim" WHERE id = "${data.id}"`);
            }
        });
    }
});

client.login(settings.token)