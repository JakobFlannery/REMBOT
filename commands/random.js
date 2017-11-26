const randomPuppy = require('random-puppy');
const people = require('../databases/blacklist.json');
const thelist = require('../databases/thelist.json');
let user = JSON.parse(fs.readFileSync("../databases/userinfo.json", "utf8"));

function upstuff(auth)
{
    let userData = user[auth];
    userData.pervertcount += 1;
    fs.writeFile("../databases/userinfo.json", JSON.stringify(user), (err) => {
        if (err) console.error(err)
    });
}

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
    
    //Check to see if arg is in 'DANGEROUS_STUFF'
    if ((thelist.DANGEROUS_CRAP).indexOf(param) > -1)
    {upstuff(message.author.id);}

    //Send reply, may 'frame' them
    if (profanity(message.author.id) == 1)
    {
        console.log('PERVERT!');
        message.channel.send(`WHAT PERVERTED INTENTIONS DO YOU HAVE IN MIND??!!! ${message.author}\nI REFUSE!`)
        upstuff(message.author.id);
    }
    else if (profanity(message.author.id) == 2)
    {
        upstuff(message.author.id);
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