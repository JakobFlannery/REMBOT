const randomPuppy = require('random-puppy');
const people = require('../databases/blacklist.json');
const thelist = require('../databases/thelist.json');

function profanity(suspect)
{
    for (var person = 0; person < (people.perverts).length; person++)//CHECK
    {
        if (suspect == people.perverts[person])
        {return 1;}
    }
    for (var person = 0; person < (people.victims).length; person++)//CHECK
    {
        if (suspect == people.victims[person])
        {return 2;}
    }
}

function fetch(sub) {
    if (Math.floor(Math.random()*10) == 1)
    {return (thelist.nsfw[Math.floor(Math.random()*(thelist.nsfw).length)]);}//CHECK
    return sub;
}

exports.run = function (client, message, args) {
    let param = args.join(' ');

    //Send reply, may 'frame' them
    if (profanity(message.author.id) == 1)
    {
        console.log('PERVERT!');
        message.channel.send(`WHAT PERVERTED INTENTIONS DO YOU HAVE IN MIND??!!! ${message.author}\nI REFUSE!`)
    }
    else if (profanity(message.author.id) == 2)
    {
        fsearch = fetch(param);
        randomPuppy(fsearch)
        .then(url => {
            console.log(url);
            if (fsearch != param) {
                console.log(`Framed ${message.author}`);
                message.channel.send(`... What are you trying to pull ${message.author}? ... Fine, if you insist:\n${url}`);
            }
        })
    }
    else
    {
        randomPuppy(param)
        .then(url => {
            console.log(url);
            message.channel.send(`${message.author} requested a Random Picture from ${param}:\n${url}`);
        })
    }
}