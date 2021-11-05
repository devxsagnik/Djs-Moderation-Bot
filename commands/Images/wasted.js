const db = require("old-wio.db");
const {
  Client,
  Message,
  MessageAttachment,
  MessageEmbed,
} = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "wasted",
  category: "Images",
  aliases: [" "],
  description: "Get wasted",
  usage: "[command]",
  cooldown: 1, 
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],

  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const avatar = user.displayAvatarURL({
      format: "png"
    });

    const image = await Canvas.wasted(avatar);

    let attach = new MessageAttachment(image, "wasted.png");

    message.channel.send({
      files: [attach]
    });

  }
}