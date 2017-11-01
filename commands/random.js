const randomPuppy = require('random-puppy');
const people = require('../databases/blacklist.json');
const thelist = require('../databases/thelist.json');
let user = JSON.parse(fs.readFileSync("../databases/userinfo.json", "utf8"));

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

    //Checks to See if Arg is in 'DANGEROUS_STUFF'
    for (var stuff = 0; stuff < (thelist.DANGEROUS_CRAP).length; stuff++){
        if (param == thelist.DANGEROUS_CRAP[stuff]){
            let userData = user[message.author.id];
            userData.pervertcount += 1;
        }
    }

    //Sends Reply, May 'Frame' Them
    if (profanity(message.author) === 1) {
        console.log('PERVERT!');
        message.channel.send(`WHAT PERVERTED INTENTIONS DO YOU HAVE IN MIND??!!! ${message.author}\nI REFUSE!`)
    } else if (profanity(message.author) === 2) {
        fsearch = fetch(param);
        randomPuppy(fsearch)
        .then(url => {
            console.log(url);
            message.channel.send(`${message.author} requested a Random Picture from ${fsearch}:\n${url}`);
            if (fsearch != param) {
                console.log(`Framed ${message.author}`);
                message.channel.send(`... What are you trying to pull? ... Fine, if you insist:\n${url}`);
            }
        })
    } else {
        randomPuppy(param)
        .then(url => {
            console.log(url);
            message.channel.send(`${message.author} requested a Random Picture from ${param}:\n${url}`);
        })
    }
}