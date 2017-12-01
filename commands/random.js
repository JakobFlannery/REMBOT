const randomPuppy = require('random-puppy');
const thelist = require('../databases/thelist.json');
const sql = require("sqlite");
sql.open("./databases/userdata.sqlite");



function fetch(sub) {
    if (Math.floor(Math.random()*10) == 1)
        {return (thelist.nsfw[Math.floor(Math.random()*(thelist.nsfw).length)]);}
    return sub;
}

exports.run = function (client, message, args) {
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`).then(data => {
        sql.get(`SELECT * FROM servers WHERE id = "${message.guild.id}"`).then(newData => {
            let param = args.join(' ');
            //DANGEROUS STUFF//
            if ((thelist.DANGEROUS_CRAP).indexOf(param) > -1) {
                sql.run(`UPDATE users SET pervcount = ${data.pervcount + 1} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
                sql.run(`UPDATE users SET totalperv = ${data.totalperv + 1} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
            }

            //Sends Reply//
            if (data.status == "Pervert") {
                console.log('PERVERT!');
                if (newData.channel == "FALSE")
                    {return;}
                if (newData.channel != "DM") {
                    message.channel.send(`WHAT PERVERTED INTENTIONS DO YOU HAVE IN MIND??!!! ${message.author}\nI REFUSE!`);
                    return;
                }
                message.author.send(`WHAT PERVERTED INTENTIONS DO YOU HAVE IN MIND??!!! ${message.author}\nI REFUSE!`);
                sql.run(`UPDATE users SET pervcount = ${data.pervcount + 1} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
                sql.run(`UPDATE users SET totalperv = ${data.totalperv + 1} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
            }
            if (data.status == "Victim") {
                if (Math.floor(Math.random()*(data.pervcount / Math.pow(data.pervcount, 2) * 100)) == 1) {
                    sql.run(`UPDATE users SET pervcount = ${data.pervcount + 1} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
                    sql.run(`UPDATE users SET totalperv = ${data.totalperv + 1} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
                    fsearch = fetch(param);
                    randomPuppy(fsearch)
                    .then(url => {
                        console.log(url);
                        console.log(`Framed ${message.author}`);
                        if (newData.channel == "FALSE")
                            {return;}
                        if (newData.channel != "DM") {
                            message.channel.send(`... What are you trying to pull ${message.author}? ... Fine, if you insist:\n${url}`);
                            return;
                        }
                        message.author.send(`... What are you trying to pull ${message.author}? ... Fine, if you insist:\n${url}`););
                    })
                } else {
                    randomPuppy(param)
                    .then(url => {
                        console.log(url);
                        if (newData.channel == "FALSE")
                            {return;}
                        if (newData.channel != "DM") {
                            message.channel.send(`${message.author} requested a Random Picture from ${param}:\n${url}`);
                            return;
                        }
                        message.author.send(`${message.author} requested a Random Picture from ${param}:\n${url}`););
                    })
                }
            }
            if (data.status == "Friend") {
                randomPuppy(param)
                .then(url => {
                    console.log(url);
                    if (newData.channel == "FALSE")
                        {return;}
                    if (newData.channel != "DM") {
                        message.channel.send(`${message.author} requested a Random Picture from ${param}:\n${url}`);
                        return;
                    }
                    message.author.send(`${message.author} requested a Random Picture from ${param}:\n${url}`);
                })
            }
        });
    });
}