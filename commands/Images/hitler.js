const {
  MessageEmbed
} = require('discord.js');
const Discord = require(`discord.js`);
const config = require("../../configs/config.json")
const canvacord = require("canvacord");
module.exports = {
  name: "hitler",
  category: "fun",
  aliases: [""],
  usage: `hitler [@User]`,
  description: "*Image cmd in the style hitler*",
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]  

  run: async (client, message, args) => {
    let tempmsg = await message.channel.send({
      embeds: [new MessageEmbed().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL).setAuthor("Loading...", "https://cdn.discordapp.com/emojis/769935094285860894.gif")]
    });
    let user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({
      dynamic: false,
      format: 'png'
    });
    let image = await canvacord.Canvas.hitler(avatar);
    let attachment = await new Discord.MessageAttachment(image, "hitler.png");
    let fastembed2 = new Discord.MessageEmbed()
      .setColor("BLURPLE").setFooter(client.user.username, config.AVATARURL)
      .setImage("attachment://hitler.png")
      .setFooter(client.user.username, config.AVATARURL)
    await message.channel.send({ embeds: [fastembed2], files: [attachment]});
    await tempmsg.delete();
  }
}