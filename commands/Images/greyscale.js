const Discord = require("discord.js");

module.exports = {
  name: "greyscale",
  category: "Images",
  description: "greyscale your avatar",
  aliases: [" "],
  usage: "greyscale",
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
    let img = await new DIG.Greyscale().getImage(avatar)
    let attach = new Discord.MessageAttachment(img, "greyscale.png");;
    message.channel.send({ files: [attach] });
  }
}