const fs = require('fs');
let user = JSON.parse(fs.readFileSync("./databases/userinfo.json", "utf8"));


exports.run = function(client, message, args) {
    var points = user[message.author.id];
    message.channel.send(`${message.author} Has ${points.msgcount} Points Right Now`);
}