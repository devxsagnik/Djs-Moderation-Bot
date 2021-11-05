const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
  name: "jail",
  category: "Images",
  description: "Make yourself in jail",
  aliases: [" "],
  usage: "jail",
  cooldown: 1, 
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],

  run: async (client, message, args) => {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });
    let img = await new DIG.Jail().getImage(avatar)
    let attach = new Discord.MessageAttachment(img, "jail.png");;
    message.channel.send({ files: [attach] });
  }
}