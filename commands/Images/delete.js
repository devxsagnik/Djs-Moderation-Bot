const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "delete",
  category: "Images",
  description: "Make a delete image of your avatar",
  aliases: [" "],
  usage: "delete",
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
    // Make the image
    let img = await new DIG.Delete().getImage(avatar)
    // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "delete.png");
    message.channel.send({
      files: [attach]
    });
  }
}