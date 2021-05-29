const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.js');

module.exports = {
  config: {
    name: "cat",
    aliases: ["kitten", "kitty", "pussy"],
    category: "images",
    description: "Sends a random cat image !!",
    usage: `${config.PREFIX}cat`,
},
    run: async (bot, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/cat');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🐈 Meow !!! 🐈`)
    .setImage(img)
    .setFooter(`Requested ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}