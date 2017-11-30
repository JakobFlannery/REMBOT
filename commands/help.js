const Discord = require('discord.js');


exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setTitle('REMBOT Help Message!')
  .setAuthor('REMBOT', 'https://wallpapercave.com/wp/wp2140054.jpg') // My Profile Pic
  /*
   * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
   */
  .setColor(0x0000ff)
  .setDescription('Use REMBOT by Adding the Prefix \'^\' to One of the Following Commands. *Commands are Not Case-Sensitive*')
  .setFooter('Bot by SnarkSlayer', 'https://goo.gl/hkFYh0')
  .setImage('https://images3.alphacoders.com/734/734139.png') // Rem
  .setThumbnail('https://avatarfiles.alphacoders.com/872/87272.png') // Rem Avatar
  /*
   * Takes a Date Object, Defaults to Current Date.
   */
  .setTimestamp()
  .addField('Below are the Currently Supported Commands, at Least the Ones that were Bothered to be Put Up Here...', `\u200b`)
  /*
   * COMMAND LIST
   */
  .addField('\u200b', `**User Commands:**`)
  .addField('Help', `*This Message*`)
  .addField('Random', `Requests for a Random Image from a Specified SubReddit\n**Usage** ^Random <subreddit>`)
  .addField('Rem', `Returns 'Rem!' if Online\n**Usage** ^Rem`)
  .addField('Points', `Returns Your Current Points. *Points Vary Over Time*\n**Usage** ^Points`)
  .addField('Streak', `Returns Your Current Message Streak\n**Usage** ^Streak`)
  .addField('Status', `Returns Your Current Status (Friend, Victim, Perv)\n**Usage** ^Status`)
  .addField('\u200b', `**Admin Commands:**`)
  .addField('ClearPoints', `Used to Clear User Message Count\n**Usage** ^ClearPoints`)
  .addField('ResetCount', `Used to Clear User \'Pervert\' Count\n**Usage** ^ResetCount`)
  .addField('Say', `Messages Relative Chat with Specified Argument\n**Usage** ^Say <Message>`)
  .addField('Send', `Messages Specified Chat with Specified Argument\n**Usage** ^Send <ChannelID> <Message>`)
  .addField('DefaultStatus', `Used to Update Default Status (Friend, Victim, Perv)\n**Usage** ^DefaultStatus <Status>`)
  .addField('DefaultChannel', `Used to Update Channel in Which Spam is Messaged (Can be DM)\n**Usage** ^DefaultChannel <ChannelID>`)
  .addField('UpdateStatus', `Used to Update a User's Status\n**Usage** ^UpdateStatus <Status> <@UserID>`)
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