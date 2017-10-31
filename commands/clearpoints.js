let user = JSON.parse(fs.readFileSync("./databases/userinfo.json", "utf8"));
const userlist = require('./databases/thelist.json');
const settings = require('../config.json');
const chalk = require('chalk');

exports.run = function(client, message, args) {
    if (message.author == settings.adminid) {
        console.log(chalk.bgRed('Wiped all User Coin Data!'));
        for (var username = 0; username < (userlist.users).length; username++) {
            let newUserData = user[userlist.users[username]];
            newUserData.coins = 0;
        }
    }
}