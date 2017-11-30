const thelist = require('../databases/thelist.json');
const settings = require('../config.json');
const chalk = require('chalk');
const sql = require("sqlite");
sql.open("./databases/userdata.sqlite");

exports.run = function(client, message, args) {
    if ((settings.adminid).indexOf(message.author.id) > -1) {
        console.log(chalk.bgRed('Wiped all User Coin Data!'));
        sql.get(`SELECT * FROM servers WHERE id = "${message.guild.id}"`).then(data => {
            for (var userid = 0; userid < data.usernum; userid++)
            {
                sql.run(`UPDATE users SET msgcount = ${0} WHERE num = ${userid}`);
            }
        });
    }
}