const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'ai-setup',
		aliases: ['chat-setup'],
		category: "admin",
		description: 'Starts a setup for AI Chat System',
		usage: 'ai-setup'
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

		let embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle('What Setup do u want?')
			.setDescription(
				`${
					!bot.setups.get(message.guild.id, 'aichatsystem.enabled')
						? `**1.** \`Enable AI-Chat\` - *Allows you to Chat with the AI*`
						: `**1.** \`Disable AI-Chat\` - *Disables the AI Chat*`
				}
**2.** \`Set AI-Chat channel\` - *Sets the AI Chat Channel if enabled*
**3.** \`Reset AI Chat System\` - *Resets the AI chat system*
`
			)

			.setFooter('Pick the INDEX NUMBER');
		message.reply(embed).then(msg => {
			msg.channel
				.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
				.then(collected => {
					switch (collected.first().content.toString()) {
						case '1':
							if (!bot.setups.get(message.guild.id, 'aichatsystem.enabled')) {
								bot.setups.set(message.guild.id, true, 'aichatsystem.enabled');
								message.reply('Succesfully enabled the Ai-Chat');
							} else if (
								bot.setups.get(message.guild.id, 'aichatsystem.enabled')
							) {
								bot.setups.set(message.guild.id, false, 'aichatsystem.enabled');
								message.reply('Succesfully disabled the Ai-Chat');
							} else {
								message.reply('Something went wrong');
							}
							break;
						case '2':
							if (!bot.setups.get(message.guild.id, 'aichatsystem.enabled')) {
								return message.channel.send(
									'Please enable the chat system **First**!!'
								);
							} else {
								message.channel.send(
									new Discord.MessageEmbed()
										.setTitle(`AI-Chat Setup`)
										.setAuthor(
											message.author.username,
											message.author.displayAvatarURL({ dynamic: true })
										)
										.setThumbnail(message.guild.iconURL())
										.setDescription(
											'Please mention the channel in which the AI-Chat setup is to be created\nType `cancel` if you wanna stop the setup'
										)
										.setColor('RANDOM')
								);
								startMessageCollectors(bot, message, args);
								function startMessageCollectors(bot, message, args) {
									let channelFilter = m => m.author.id === message.author.id;
									let channelCollector = new Discord.MessageCollector(
										message.channel,
										channelFilter,
										{ max: 999 }
									);

									channelCollector.on('collect', async msg => {
										let channel =  msg.mentions.channels.first();
										if (msg.content.toLowerCase() === 'cancel') {
											msg.channel.send(
												'The AI-Chat system setup has been stopped.Run the command again to start a new one!!'
											);
											channelCollector.stop();
											return;
										} else if (!channel) {
											await msg.channel.send(
												':x: Setup cancelled.Please mention a valid channel!!'
											);
											await channelCollector.stop();
											return;
										  
										} else {
											bot.setups.set(
												message.guild.id,
												channel.id,
												'aichatsystem.channel'
											);
											message.channel.send(
												'Successfully set the AI-Chat system to ' +
													channel.toString()
											);
											channelCollector.stop();
										}
									});
								}
							}
							break;
							case "3":
							  bot.setups.set(message.guild.id, {
            enabled: false,
            channel: "",
        }, "aichatsystem");
        message.reply("Succesfully resetted Ai Chat Setup");
        break;
						default:
							message.reply('SORRY, that Number does not exists :(');
							break;
					}
				})
				.catch(error => {
					console.log(error);
					return message.reply('⌛ Sorry but your time ran out');
				});
		});
	}
};
