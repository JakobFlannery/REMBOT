const randomPuppy = require('random-puppy');
const people = require('../databases/blacklist.json');
const thelist = require('../databases/thelist.json');

exports.run = function (client, message, args) {
    let param = args.join(' ');

    function profanity(suspect) {
        for (var person = 0; person < (people.perverts).length; person++) {
            if (suspect == people.perverts[person]) {
                return 1;
            }
        }
        for (var person = 0; person < (people.victims).length; person++) {
            if (suspect == people.victims[person]) {
                return 2;
            }
        }
    }

    function fetch(sub) {
        if (Math.floor(Math.random()*10) == 1) {
            return (thelist.nsfw[Math.floor(Math.random()*(thelist.nsfw).length())]);
        }
        return sub;
    }

    if (profanity(message.author) === 1) {
        console.log('PERVERT!');
        message.channel.send(`WHAT LEWD INTENTIONS DO YOU HAVE IN MIND??!!! ${message.author}`)
    } else if (profanity(message.author) === 2) {
        fsearch = fetch(param);
        randomPuppy(fsearch)
        .then(url => {
            console.log(url);
            message.channel.send(`${message.author} requested a Random Picture from ${fsearch}:`);
            if (fsearch != param) {
                console.log(`Framed ${message.author}`);
                message.channel.send('... What are you trying to pull? ... Fine, if you insist:');
            }
            message.channel.send(url)
        })
    } else {
        randomPuppy(param)
        .then(url => {
            console.log(url);
            message.channel.send(`${message.author} requested a Random Picture from ${param}:`);
            message.channel.send(url)
        })
    }
}