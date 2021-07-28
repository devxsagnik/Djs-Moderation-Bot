const db = require("old-wio.db");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  config: {
  name: "addemoji",
  aliases: ["upload_emoji", "a-emote"],
  description: "Steal emojis and upload it on your server",
  usage: "addemoji <emoji>",
  category: "admin",
  },
  run: async (bot, message, args) => {

    if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
      return message.channel.send(`You Don't Have Permission To Use This Command! Manage Emojis`)
    }

    if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) { return message.channel.send(`I dont have perms to upload emoji`)
    }

    const emoji = args[0];
    if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const Added = new MessageEmbed()
        .setTitle(`Emoji Added`)
        .setColor(`RANDOM`)
        .setDescription(
          `Emoji Has Been Added!\nName : ${name || `${customemoji.name}`}\nPreview : [Click Me](${Link})`
        );
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(`Please Give Me A Valid Emoji!`);
      message.channel.send(
        `You Can Use Normal Emoji Without Adding In Server!`
      );
    }
  }
};
