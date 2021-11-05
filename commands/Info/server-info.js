const discord = require('discord.js');
const db = require('old-wio.db');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	config: {
		name: 'serverinfo',
		aliases: ['si', 's-info'],
		category: 'info',
		description: 'Shows the detailed info about the server',
		usage: 'serverinfo'
	},
	run: async (bot, message, args) => {
		const roles = message.guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;
		const regions = {
			brazil: 'Brazil',
			europe: 'Europe',
			hongkong: 'Hong Kong',
			india: 'India',
			japan: 'Japan',
			russia: 'Russia',
			singapore: 'Singapore',
			southafrica: 'South Africa',
			sydeny: 'Sydeny',
			'us-central': 'US Central',
			'us-east': 'US East',
			'us-west': 'US West',
			'us-south': 'US South'
		};

		const embed = new MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setColor('RANDOM')
			.addField('Owner', message.guild.owner.user.tag)
			.addField('Region', regions[message.guild.region])
			.addField(
				'Channel Categories',
				channels.filter(channel => channel.type === 'category').size
			)
			.addField(
				'Text Channels',
				channels.filter(channel => channel.type === 'text').size
			)
			.addField(
				'Voice Channels',
				channels.filter(channel => channel.type === 'voice').size
			)
			.addField('Members', message.guild.memberCount)
			.addField('Roles', roles.length)
			.setFooter(
				`ID: ${message.guild.id} | Server Created - ${moment(
					message.guild.createdTimestamp
				).format('LT')} ${moment(message.guild.createdTimestamp).format(
					'LL'
				)} ${moment(message.guild.createdTimestamp).fromNow()}`
			);
		message.channel.send(embed);
	}
};
