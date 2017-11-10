const fs = require('fs');
let user = require('../databases/userinfo.json');

exports.run = function(client, message, args) {
    var points = user[message.author.id];
    message.channel.send(`${message.author} Has Reached a ${points.streak} Post Streak!`);
}