const user = require('../databases/userinfo.json');

exports.run = function(client, message, args) {
    var points = user[message.author.id];
    message.channel.send(`${message.author} Has ${points.coins} Points Right Now`);
}