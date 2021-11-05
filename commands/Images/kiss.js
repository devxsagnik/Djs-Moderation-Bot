const Discord = require("discord.js");
const canvacord = require("canvacord");
const config = require("../../configs/config.json");
const { MessageEmbed } = require ("discord.js");
 
module.exports = {
  name: "kiss",
  category: "Images",
  description: "Get a random kiss image",
  aliases: [" "],
  usage: "kiss <@user>",
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
   
run: async (client, message, args) => {
  let tempmsg = await message.channel.send({
    embeds: [new MessageEmbed().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL).setAuthor("Loading...", "https://cdn.discordapp.com/emojis/769935094285860894.gif")]
  });
        let user = message.mentions.users.first() || message.author;
        let user2 = message.mentions.users.last() || message.author;
        if(user===user2) user2 = message.author;
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let avatar2 = user2.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.kiss(avatar,avatar2);
        let attachment = await new Discord.MessageAttachment(image, "kiss.png");
        let fastembed2 = new Discord.MessageEmbed()
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setImage("attachment://kiss.png")
        .setFooter(client.user.username, config.AVATARURL)
        await message.channel.send({ embeds: [fastembed2], files: [attachment]});
        await tempmsg.delete();
}
}
    