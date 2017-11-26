const thelist = require('../databases/thelist.json');
const settings = require('../config.json');
const chalk = require('chalk');
const sql = require("sqlite");
sql.open("./databases/userdata.sqlite");

exports.run = function(client, message, args) {
    if ((settings.adminid).indexOf(message.author.id) > -1) {
        console.log(chalk.bgRed('Wiped Perv Counts!'));
        for (var userid = 0; userid < (thelist.users).length; userid++)
        {
            sql.get(`SELECT * FROM users WHERE id ="${thelist.users[userid]}"`).then(data => {
                sql.run(`UPDATE users SET pervcount = ${data.pervcount * 0} WHERE id = ${data.id}`);
            });
        }
    }
}