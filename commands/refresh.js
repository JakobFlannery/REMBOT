const settings = require('../config.json');
const chalk = require('chalk');
const sql = require("sqlite");
sql.open("./databases/userdata.sqlite");

exports.run = function(client, message, args) {
    if ((settings.adminid).indexOf(message.author.id) > -1) {
        console.log(chalk.bgRed('Reseting User Settings...'));
        sql.get(`SELECT * FROM servers WHERE id = "${message.guild.id}"`).then(data => {
            for (var userid = 0; userid < data.usernum; userid++)
            {
                sql.run(`UPDATE users SET status = ${data.defaultstatus} AND channel = ${data.channel} WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`);
            }
        });
    }
}