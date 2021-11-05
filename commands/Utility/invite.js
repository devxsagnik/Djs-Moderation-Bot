const Discord = require("discord.js");
const db = require("old-wio.db");
const { Owner_Name } = require("../../config");
const { support } = require("../../config.json");

module.exports = {
  config: {
  name: "invite",
  aliases: ["invitelink"],
  category: "utility",
  description: "Give You My Invite Link",
  usage: "invite",
  },
  run: async (bot, message, args) => {
    
    const Invite = `https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`, Owne = `${Owner_Name}`, Dev = `Felix_PlaYz#0001`;
    
    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Thanks for using the bot")
    .addField("Invite Me", `[Click Me](${Invite})`, true)
    .addField("Support Server", `[Click Me](${support})`, true)
    .addField("Owner", Owne, true)
    .addField("Dev", Dev, true)
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("Invite Link - " + Invite));
  }
};