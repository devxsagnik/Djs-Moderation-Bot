const canva = require('canvacord');
const Discord = require('discord.js')

module.exports = {
  name: "triggered",
  category: "Images",
  description: "Get triggered",
  aliases: [" "],
  usage: "triggered",
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

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