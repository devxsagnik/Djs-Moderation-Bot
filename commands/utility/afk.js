const db = require('old-wio.db');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'setafk',
		aliases: ['afk'],
		description: 'Sets your afk in the server',
		usage: 'setafk <reason>',
		category: 'utility'
	},
	run: async (bot, message, args) => {
		const content = args.join(' ');
		await db.set(`afk-${message.author.id}+${message.guild.id}`, content);
		await db.set(`aftime-${message.author.id}+${message.guild.id}`, Date.now());
		const embed = new MessageEmbed()
			.setDescription(`You have been set to afk\n**Reason :** ${content}`)
			.setColor('GREEN')
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			);
		message.channel.send(embed);
	}
};
