const db = require("old-wio.db");
const Discord = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {
config: {
  name: "botinfo",
  category: "info",
  aliases: ['binfo', 'botstats', 'stats'],
  description: 'Check\'s bot\'s status',
},
  run: async (bot, message, args) => {
   message.delete();
      message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${bot.user.username} v${version}`, bot.user.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .addField('❯ Uptime :', `${ms(bot.uptime)}`, true)
            .addField('❯ WebSocket Ping:', `${bot.ws.ping}ms`, true)
            .addField('❯ Memory:', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField('❯ Guild Count:', `${bot.guilds.cache.size} guilds`, true)
            .addField(`❯ User Count:`, `${bot.guilds.cache.reduce((users , value) => users + value.memberCount, 0)} users`, true)
            .addField('❯ Commands:', `${bot.commands.size} cmds`,true)
            .addField('❯ Node:', `${process.version} on ${process.platform} ${process.arch}`, true)
            .addField('❯ Cached Data:', `${bot.users.cache.size} users\n${bot.emojis.cache.size} emojis`, true)
            .addField('❯ Discord.js:', `${discordjsVersion}`, true)
            .setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL({
              dynamic: true
            }))
            .setTimestamp()
        );
    }
}
