const Discord = require("discord.js");

module.exports = {
    config: {
  name: "avatar",
  aliases: ["av"],
  description: "Display a user avatar",
  usage: "avatar [@user | user ID]",
  category: "info",
    },
 run: async (bot, message, args) => {
  let user;

if (message.mentions.users.first())
 {
user = message.mentions.users.first();

} else if (args[0]) {

user = message.guild.members.cache.get(args[0]).user;

} else {
user = message. author;
}



let avatar = user.displayAvatarURL ({size: 4096, dynamic: true});

const embed = new Discord.MessageEmbed()

.setTitle(`${user.tag} avatar`)
.setDescription(`[Avatar URL of ${user.tag}](${avatar})`) 
.setColor("RANDOM")
.setImage(avatar);

return message.channel.send(embed);
}
};