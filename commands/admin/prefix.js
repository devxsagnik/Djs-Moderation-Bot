const db = require('old-wio.db');
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config.js');

module.exports = {
	config: {
		name: 'prefix',
		category: 'admin',
		description: "Change/Know The server's Prefix or the Global Prefix",
		usage: '!prefix <new prefix/reset>',
		example: '1) !prefix = \n2) !prefix reset',
		aliases: ['prefix']
	},

	run: async (bot, message, args) => {
		let option = args[0];

		//PERMISSION
		if (!message.member.hasPermission('MANAGE_GUILD')) {
			return message.channel.send(
				'You are not allowed or do not have permission to change prefix'
			);
		}

		if (!option) {
			prefix = db.fetch(`prefix_${message.guild.id}`);
			if (!prefix) prefix = PREFIX;
			let prefEmbed = new MessageEmbed()
				.setColor('YELLOW')
				.setDescription(
					`**My prefix for \`${message.guild.name}\`  is  **` +
						`  \`${prefix}\` \n**Type \`${prefix}help\` for help**`
				);

			message.channel.send(prefEmbed);
		} else if (option.toLowerCase() === 'reset') {
			db.delete(`prefix_${message.guild.id}`);
			return await message.channel.send('Reseted Prefix ✅');
		} else if (args[1]) {
			return message.channel.send('You can not set prefix a double argument');
		} else if (args[0].length > 4) {
			return message.channel.send(
				'You can not send prefix more than 4 characters'
			);
		} else if (args.join('') === PREFIX) {
			db.delete(`prefix_${message.guild.id}`);
			return await message.channel.send('Reseted Prefix ✅');
		} else {

		db.set(`prefix_${message.guild.id}`, args[0]);
		await message.channel.send(`Done ✅ | Bot Prefix Set to ${args[0]}`);
		}
	}
};
