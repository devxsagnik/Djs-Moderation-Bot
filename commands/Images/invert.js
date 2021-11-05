const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "invert",
  category: "Images",
  description: "invert your avatar",
  aliases: [" "],
  usage: "invert",
  cooldown: 1, 
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],

  run: async (client, message, args) => {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });
    let img = await new DIG.Invert().getImage(avatar)
    let attach = new Discord.MessageAttachment(img, "invert.png");
    message.channel.send({
      files: [attach]
    });
  }
}