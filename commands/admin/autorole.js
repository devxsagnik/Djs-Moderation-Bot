const db = require('quick.db');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'autorole',
		aliases: ['set-autorole', 'greet-role'],
		category: 'admin',
		description: 'Adds or Removes the selected role in autorole database',
		usage: 'autorole'
	},
	run: async (bot, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send(
				new MessageEmbed()
					.setTitle('Error')
					.setDescription(
						':x: Sorry but you dont have permission to use this command!!'
					)
					.setColor('#FF0000')
					.setTimestamp()
			);

		let rrembed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle('What do u want to do?')
			.setDescription(
				`
**1.** \`Add Role\` - *Adds a Role in the database*
**2.** \`Remove Role\` - *Removes a Role from the database*
`
			)
			.setFooter('Pick the INDEX NUMBER')
			.setTimestamp();

		message.channel.send(rrembed).then(msg => {
			msg.channel
				.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 60000,
					errors: ['TIME']
				})
				.then(collected => {
					switch (collected.first().content.toString()) {
						case '1':
							message.channel.send('Ping your Role now!').then(msg => {
								msg.channel
									.awaitMessages(m => m.author.id === message.author.id, {
										max: 1,
										time: 60000,
										errors: ['TIME']
									})
									.then(collected => {
									const fetched = bot.setups.get(message.guild.id, "welcome.roles");
									
									if(fetched === null) {
									  bot.setups.set(message.guild.id, {
									    roles: []
									  }, "welcome")
									};
										let role = collected
											.first()
											.mentions.roles.map(role => role.id)
											.join(' ');
										if (!role)
											return message.reply(
												`COULD NOT FIND THE ROLE! Please retry Setup`
											);
										let guildrole = message.guild.roles.cache.get(role);
										let botrole = message.guild.roles.cache.get(
											message.guild.me.roles.highest.id
										);

										if (guildrole.position >= botrole.position) {
											return message.channel.send(
												'I can\'t access that role, place "me" / "my highest Role" above other roles that you want me to manage.\n\n Please retry Setup'
											);
										}
										bot.setups.push(message.guild.id, role, 'welcome.roles');
										return message.reply(
											`Successfully added Role to the Autorole Setup!`
										);
									});
							});
							break;
						case '2':
							message.channel.send('Please ping your Role now!').then(msg => {
								msg.channel
									.awaitMessages(m => m.author.id === message.author.id, {
										max: 1,
										time: 60000,
										errors: ['TIME']
									})
									.then(collected => {
										let role = collected
											.first()
											.mentions.roles.map(role => role.id)
											.join(' ');
										if (!role)
											return message.reply(
												`COULD NOT FIND THE ROLE! Please retry Setup`
											);
										try {
											bot.setups.remove(
												message.guild.id,
												role,
												'welcome.roles'
											);
											return message.reply(
												`Successfully removed Role from the Autorole Setup!`
											);
										} catch (e) {
											console.log(e);
											return message.reply(`Something Went Wrong : ${e}`);
										}
									});
							});
							break;
						default:
							message.reply(
								String(
									'SORRY, that Number does not exists :(\n Your Input:\n> ' +
										collected.first().content
								).substr(0, 1999)
							);
							break;
					}
				})
				.catch(error => {
					console.log(error);
					return message.reply('Sorry but your time ran out ⌛!');
				});
		});
	}
};
