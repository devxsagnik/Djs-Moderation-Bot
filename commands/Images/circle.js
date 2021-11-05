const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "circle",
  category: "Images",
  description: "Make your avatar in circle",
  aliases: [" "],
  usage: "circle",
  cooldown: 1, 
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],

  run: async (client, message, args) => {

    const user = message.mentions.users.first() || message.author;
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });
    let img = await new DIG.Circle().getImage(avatar)
    let attach = new Discord.MessageAttachment(img, "circle.png");;
    message.channel.send({
      files: [attach]
    });
  }
}