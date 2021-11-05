const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "blur",
  category: "Images",
  description: "blur your avatar",
  aliases: [" "],
  usage: "blur",
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
    let img = await new DIG.Blur().getImage(avatar)
    let attach = new Discord.MessageAttachment(img, "blur.png");;
    message.channel.send({
      files: [attach]
    });
  }
}