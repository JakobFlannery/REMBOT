const settings = require('../config.json');

module.exports = message => {
    if (!message.content.startsWith(settings.prefix)) return;
    if (message.author.bot) return;
    const client = message.client;
    const args = message.content.split(' ');
    const command = args.shift().slice(settings.prefix.length);
    let parems = message.content.split(' ').slice(1);
    try {
        let cmdFile = require(`../commands/${command}`);
        cmdFile.run(client, message, args);
    } catch (err) {
        console.log(`Command ${command} failed\n${err.stack}`);
    }
}