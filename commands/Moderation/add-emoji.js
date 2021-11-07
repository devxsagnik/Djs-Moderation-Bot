const {
  MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "addemoji",
  category: "Moderation",
  aliases: ["upload_emoji", "a-emote"],
  description: "Steal emojis and upload it on your server",
  usage: "addemoji <emoji>",
  category: "Moderation",
  cooldown: 1,
  memberpermissions: ["MANAGE_GUILD", "MANAGE_EMOJIS_AND_STICKERS"],
  requiredroles: [],
  alloweduserids: [],

  run: async (client, message, args) => {

    const emoji = args[0];
    if (!emoji) return message.channel.send({
      content: `Please Give Me A Emoji!`
    });

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
        .setColor(`BLURPLE`)
        .setDescription(
          `Emoji Has Been Added!\nName : ${name || `${customemoji.name}`}\nPreview : [Click Me](${Link})`
        );
      return message.channel.send({
        embeds: [Added]
      });
    } else {
      let CheckEmoji = parse(emoji, {
        assetType: "png"
      });
      if (!CheckEmoji[0])
        return message.channel.send({
          content: `Please Give Me A Valid Emoji!`
        });
      message.channel.send({
        content: `You Can Use Normal Emoji Without Adding In Server!`
      });
    }
  }
};