const Discord = require('discord.js');


exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setTitle('REMBOT Help Message!')
  .setAuthor('REMBOT', 'https://myanimelist.cdn-dena.com/images/characters/4/301226.jpg')
  /*
   * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
   */
  .setColor(0x0000ff)
  .setDescription('Use REMBOT by Adding the Prefix \'^\' to One of the Following Commands. *Commands are Not Case-Sensitive*')
  .setFooter('Bot by SnarkSlayer', 'https://goo.gl/hkFYh0')
  .setImage('https://images8.alphacoders.com/827/thumb-350-827051.png') // Yotsugi
  .setThumbnail('https://33.media.tumblr.com/ef347d5cc983dd489a1d7d2b37adbb06/tumblr_na15paG4Xm1tvqnm6o1_400.gif') // Ahoge
  /*
   * Takes a Date Object, Defaults to Current Date.
   */
  .setTimestamp()
  .addField('Below are the Currently Supported Commands, at Least the Ones that were Bothered to be Put Up Here...')
  /*
   * COMMAND LIST
   */
  .addField('**User Commands**')
  .addField('Help', `*This Message*`)
  .addField('Random', `Requests for a Random Image from a Specified SubReddit\n**Usage** ^Random <subreddit>`)
  .addField('Rem', `Returns 'REM!' if Online\n**Usage** ^Rem`)
  .addField('Points', `Returns Your Current Points. *Points Vary Over Time*\n**Usage** ^Points`)
  .addField('Streak', `Returns Your Current Message Streak\n**Usage** ^Streak`)
  .addField('**Admin Commands:**')
  .addField('ClearPoints', `Used to Clear User Message Count\n**Usage** ^ClearPoints`)
  .addField('ResetCount', `Used to Clear User \'Pervert\' Count\n**Usage** ^ResetCount`)
  .addField('Say', `Messages Relative Chat with Specified Argument\n**Usage** ^Say <Message>`)
  .addField('Send', `Messages Specified Chat with Specified Argument\n**Usage** ^Send <ChannelID> <Message>`)
  /*
   * Blank field, useful to create some space.
   */
  .addField('\u200b', '\u200b', true)

/*
 *  You can only use the shorthand "{ embed }" when your embed variable is also called embed.
 *  If it's not called embed, use "{ embed: variableName }" instead.
 */ 
message.channel.send({ embed });
}