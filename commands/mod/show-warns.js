const db = require("old-wio.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
  name: "show-warns",
  aliases: ["warnings"],
  description: "Get the warnings of yours or mentioned person",
  category: "mod",
  },
  run: (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(
      new MessageEmbed()
      .setDescription("You dont have Moderation perms to use this command")
      .setFooter("BAN_MEMBERS")
      .setColor(Color)
      );
    const user = message.mentions.members.first() || message.author
    
  
    let warnings = db.fetch(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    
    message.channel.send(`${user} have **${warnings}** warning(s)`)
  
  
  }
}