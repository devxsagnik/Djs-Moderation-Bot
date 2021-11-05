const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "blur",
  category: "Images",
  description: "blur your avatar",
  aliases: [" "],
  usage: "blur",
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
    let img = await new DIG.Blur().getImage(avatar)
    let attach = new Discord.MessageAttachment(img, "blur.png");;
    message.channel.send({
      files: [attach]
    });
  }
}