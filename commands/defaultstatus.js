const settings = require('../config.json');
const chalk = require('chalk');
const sql = require("sqlite");
sql.open("./databases/userdata.sqlite");

exports.run = function(client, message, args) {
    if ((settings.adminid).indexOf(message.author.id) > -1) {
        let param = args.join(' ');
        console.log(chalk.bgRed(`User Status Default -> ${stat}`));
        sql.run(`UPDATE servers SET status = ${param} WHERE id = "${message.guild.id}"`).catch(() => {
            message.channel.send(`Error with argument ${param}`);
        });
    }
}