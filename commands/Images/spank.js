const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "spank",
  category: "Images",
  description: "Spank a user",
  aliases: [" "],
  usage: "spank <@user>",
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {
    let target1 = message.author

    let target2 = message.mentions.users.first();

    if (!target2) return message.channel.send({ content: "Please Mention Someone!"});

    let avatar = target1.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });

    let avatar2 = target2.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });

    let img = await new DIG.Spank().getImage(avatar, avatar2)
    
    let attach = new Discord.MessageAttachment(img, "spank.png");;
    message.channel.send({
      files: [attach]
    });
  }
}