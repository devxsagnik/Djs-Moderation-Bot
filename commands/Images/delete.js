const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "delete",
  category: "Images",
  description: "Make a delete image of your avatar",
  aliases: [" "],
  usage: "delete",
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

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