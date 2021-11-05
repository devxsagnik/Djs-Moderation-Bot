const fetch = require("node-fetch");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "meme",
  category: "Images",
  aliases: [" "],
  usage: "meme",
  cooldown: 1, 
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  description: "Get Fresh meme :D",

  run: async (client, message, args) => {

    let data = await fetch(
      `https://meme-api.herokuapp.com/gimme/memes`
    ).then((res) => res.json());

    const embed = new MessageEmbed();
    embed.setTitle(data.title);
    embed.setImage(data.url);
    embed.setURL(data.postLink);
    embed.setColor("BLURPLE");
    embed.setFooter("© Beat Box");
    embed.setTimestamp();

    message.channel.send({embeds: [embed]});
  },
};