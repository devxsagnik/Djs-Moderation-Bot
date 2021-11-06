const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.js');

module.exports = {
  config: {
    name: "kangaroo",
    category: "images",
    description: "Sends a random Kangaroo image !!",
    usage: `${config.PREFIX}kangaroo`,
},
    run: async (bot, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/kangaroo');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🦘 Kangaroo 🦘`)
    .setImage(img)
    .setFooter(`Requested ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}