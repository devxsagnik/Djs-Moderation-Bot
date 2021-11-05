const { MessageEmbed } = require("discord.js");
const db = require("old-wio.db");
const Discord = require("discord.js");

module.exports = {
  config: {
    name: "set-greet-channel",
    aliases: ["set-g-ch", "greet-channel"],
    description: "Sets the greet channel",
    usage: "set-greet-channel <Mention Channel> <Type>",
  }, 
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Channels");
    
    let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    
    if (!Channel || Channel.type === "voice") return message.channel.send(`Please Give A Valid Text Channel!`);
    
    let Type = args[1];
    let Welcome = ["welcome", "wel", "join"];
    let leave = ["leave", "left"];
    let Types = [];
    Welcome.forEach(wel => Types.push(wel));
    leave.forEach(leav => Types.push(leav));
    
    if (!Type || !Types.find(T => T === Type.toLowerCase())) return message.channel.send(`Please Give A Valid Type - Welcome, Wel, Join, Leave, Left`);
    
    Type = Type.toLowerCase();
        
    async function GetType(Type) {
      if (Welcome.find(W => W === Type)) {
        return "Welcome";
      } else {
        return "Leave";
      };
    };
    
    let Current = await GetType(Type);
    
    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Sucess`)
    .setDescription(`${Current === "Welcome" ? "Welcome" : "Leave"} Channel Has Been Setted - <#${Channel.id}>`)
    .setFooter(`Setted By ${message.author.username}`)
    .setTimestamp();

    await db.set(`${Current === "Welcome" ? "Welcome" : "Leave"}_${message.guild.id}_Channel`, Channel.id);

    try {
        return message.channel.send(Embed);
    } catch (error) {
        return message.channel.send(`${Current === "Welcome" ? "Welcome" : "Leave"} Message Has Been Setted - <#${Channel}>`);
    };

  }
}