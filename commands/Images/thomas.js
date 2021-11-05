const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
  name: 'thomas',
  category: "Images",
  description: 'Thomas a User!',
  aliases: ["thomas"],
  usage: '',
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {

    let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    let m = await message.channel.send("**Please Wait...**");
    let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Thomas().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "thomas.png");
    
    setTimeout(() => m.delete(), 1000);

    message.channel.send({
      files: [attach]
    });
  },
};