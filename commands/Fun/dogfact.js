const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.js');

module.exports = {
  config: {
    name: "dogfact",
    category: "images",
    aliases: ["df"],
    description: "Sends a random dog fact !!",
    usage: `${config.PREFIX}dogfact`,
},
    run: async (bot, message, args) => {

    const res = await fetch('https://some-random-api.ml/facts/dog');
    const fact = (await res.json()).fact;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🐕 Dog Fact 🐕`)
    .setDescription(`\`\`\`${fact}\`\`\``)
    .setFooter(`Requested ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}