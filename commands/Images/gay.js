const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "gay",
  category: "Images",
  description: "Make yourself gay",
  aliases: [" "],
  usage: "gay",
  cooldown: 1, 
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],

  run: async (client, message, args) => {

    const user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });
    let img = await new DIG.Gay().getImage(avatar)
    let attach = new Discord.MessageAttachment(img, "gay.png");;
    message.channel.send({
      files: [attach]
    });
  }
}