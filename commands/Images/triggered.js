const canva = require('canvacord');
const Discord = require('discord.js')

module.exports = {
  name: "triggered",
  category: "Images",
  description: "Get triggered",
  aliases: [" "],
  usage: "triggered",
  cooldown: 1, 
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],

  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    let avatar = user.displayAvatarURL({
      dynamic: false,
      format: "png"
    });

    let image = await canva.Canvas.trigger(avatar);

    let triggered = new Discord.MessageAttachment(image, "triggered.gif")

    message.channel.send({
      files: [triggered]
    });
  }
}