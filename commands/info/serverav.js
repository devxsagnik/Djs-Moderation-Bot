const Discord = require("discord.js");

module.exports = {
  config: {
  name: "serverav",
  aliases: ["sav", "guildavatar", "servericon"],
  category: "info",
  description: "Get avatar of the server",
  usage: "servericon",
  },
  run: async (bot, message, args) => {
    
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Avatar for ${message.guild.name}`, message.guild.iconURL({
      dynamic: true
    }))
    .setDescription(`**Download This Server's Avatar**\n[Click Here](${message.guild.iconURL({ dynamic: true, size: 1024 })})`)
    .setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
    .setColor("RANDOM");
    
      message.channel.send(embed)
    
  }
}