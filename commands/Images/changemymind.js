const canva = require('canvacord');
const Discord = require('discord.js');
module.exports = {
  name: "changemymind",
  category: "Images",
  description: "Change your mind",
  aliases: ["cmm"],
  usage: "changemymind",
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {

    let text = args.join(" ");

    if (!args[0]) return message.channel.send({
      content: 'Please type some text after the command'
    });

    let image = await canva.Canvas.changemymind(text);

    let attach = new Discord.MessageAttachment(image, "cmm.png")

    message.channel.send({
      files: [attach]
    });
  }
}