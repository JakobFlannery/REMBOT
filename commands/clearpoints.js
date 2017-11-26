const thelist = require('../databases/thelist.json');
const settings = require('../config.json');
const chalk = require('chalk');
const sql = require("sqlite");
sql.open("./databases/userdata.sqlite");

exports.run = function(client, message, args) {
    if ((settings.adminid).indexOf(message.author.id) > -1) {
        console.log(chalk.bgRed('Wiped all User Coin Data!'));
        for (var userid = 0; userid < (thelist.users).length; userid++)
        {
            console.log(thelist.users[userid]);
            console.log(`${message.guild.id}${message.author.id}`)
            sql.get(`SELECT * FROM users WHERE id ="${thelist.users[userid]}"`).then(data => {
                sql.run(`UPDATE users SET msgcount = ${data.msgcount * 0} WHERE id = ${data.id}`);
            });
        }
    }
}