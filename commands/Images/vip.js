const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "vip",
  category: "Images",
  description: "Make yourself vip",
  aliases: [" "],
  usage: "vip",
  cooldown: 1, 
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],

  run: async (client, message, args) => {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });
    // Make the image
    let img = await new DIG.Ad().getImage(avatar)
    // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "vip.png");
    message.channel.send({
      files: [attach]
    });
  }
}