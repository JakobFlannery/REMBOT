const chalk = require('chalk');
const settings = require('../config.json');

exports.run = function(client, message, args) {
    if ((settings.adminid).indexOf(message.author) > -1)//CHECK
    {
        let param = args.join(' ');
        console.log(chalk.bgYellow('Say Command Used!'));
        message.channel.send(param);
    }
    else 
    {
        message.channel.send(`SPY!  ${message.author}`);
    }    
}