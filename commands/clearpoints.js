let user = JSON.parse(fs.readFileSync("../databases/userinfo.json", "utf8"));
const userlist = require('../databases/thelist.json');
const settings = require('../config.json');
const chalk = require('chalk');

exports.run = function(client, message, args) {
    if ((settings.adminid).indexOf(message.author) > -1)//CHECK
    {
        console.log(chalk.bgRed('Wiped all User Coin Data!'));
        for (var userid = 0; userid < (userlist.users).length(); userid++)//CHECK
        {
            let userData = user[userlist.users[username]];//CHECK
            userData.msgcount = 0;
        }
    }
    fs.writeFile("../userinfo.json", JSON.stringify(user), (err) => {
        if (err) console.error(err)
    });
}