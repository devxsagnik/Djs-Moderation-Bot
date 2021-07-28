const Discord = require('discord.js');
const rps = ['scissors', 'rock', 'paper'];
const res = [`Scissors ✂️`, `Rock 🗿`, `Paper 🗞️`];
const config = require('../../config.js');

module.exports = {
  config: {
    name: "rps",
    category: "fun",
    aliases: [""],
    description: "Plays rock paper scissor with the doggo !!",
    usage: `${config.PREFIX}!!rps rock`,
},

    run: async (bot, message, args) => {
        let userChoice;
    if (args.length) userChoice = args[0].toLowerCase();
    if (!rps.includes(userChoice))
      return message.channel.send('Please enter rock, paper, or scissors');
    userChoice = rps.indexOf(userChoice);

    const botChoice = Math.floor(Math.random()*3);
    let result;

    if (userChoice === botChoice) result = 'It\'s a draw no one wins';

    else if (botChoice > userChoice || botChoice === 0 && userChoice === 2) result = `**${bot.user.username}** Wins`;
    else result = `**${message.member.displayName}** Wins nice my dude !!`;

    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.member.displayName} vs ${bot.user.username} **RPS**`)
      .addField(`${message.member   .displayName}`, res[userChoice], true)
      .addField(`${bot.user.username}`, res[botChoice], true)
      .addField('Results', result)
      .setFooter(`Challenged by ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}
