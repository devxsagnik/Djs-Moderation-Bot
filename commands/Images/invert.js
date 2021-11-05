const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "invert",
  category: "Images",
  description: "invert your avatar",
  aliases: [" "],
  usage: "invert",
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });
    let img = await new DIG.Invert().getImage(avatar)
    let attach = new Discord.MessageAttachment(img, "invert.png");
    message.channel.send({ files: [attach] });
  }
}