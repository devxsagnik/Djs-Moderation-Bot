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
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

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