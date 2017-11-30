const settings = require('../config.json');
const chalk = require('chalk');
const sql = require("sqlite");
sql.open("./databases/userdata.sqlite");

exports.run = function(client, message, args) {
    if ((settings.adminid).indexOf(message.author.id) > -1) {
        let result = args.join(' ');
        var array = result.split(" ");
        var messagePrep = array.toString();
        var stat = messagePrep.replace(/,/g , " ");
        let member = message.mentions.members.first();
        console.log(chalk.bgRed(`Member: ${member} -> Status: ${stat}`));
        sql.run(`UPDATE users SET status = ${stat} WHERE id = "${member}" AND guild = "${message.guild.id}"`).catch(() => {
            message.channel.send(`User <@${member}> does not exist`);
        });
    }
}