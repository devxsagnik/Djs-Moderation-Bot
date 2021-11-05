const canva = require('canvacord');
const Discord = require('discord.js');
module.exports = {
  name: "changemymind",
  category: "Images",
  description: "Change your mind",
  aliases: ["cmm"],
  usage: "changemymind",
  cooldown: 1,
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],

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