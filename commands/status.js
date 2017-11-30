const sql = require("sqlite");
sql.open("./databases/userdata.sqlite");

exports.run = function(client, message, args) {
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}" AND guild = "${message.guild.id}"`).then(data => {
        message.channel.send(`${message.author}'s Current Status is: ${data.status}`);
    });
}