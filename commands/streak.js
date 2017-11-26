const thelist = require('../databases/thelist.json');
const sql = require("sqlite");
sql.open("./databases/userdata.sqlite");

exports.run = function(client, message, args) {
    sql.get(`SELECT * FROM users WHERE id ="${message.guild.id}${message.author.id}"`).then(data => {
        message.channel.send(`${message.author} Has Reached a ${data.streak} Post Streak!`);
    });
}