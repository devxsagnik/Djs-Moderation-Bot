const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ai-setup',
	aliases: ['chat-setup'],
	category: "AI-Chat",
	description: 'Starts a setup for AI Chat System',
	usage: 'ai-setup',
	cooldown: 1,
	memberpermissions: [],
	requiredroles: [],
	alloweduserids: [],


	run: async (client, message, args) => {

		if (!message.member.permissions.has('ADMINISTRATOR'))
			return message.channel.send({
				embeds: [
					new MessageEmbed()
						.setTitle('Error')
						.setDescription(
							':x: Sorry but you dont have permission to use this command!!'
						)
						.setColor('#FF0000')
						.setTimestamp()
				]
			});

		let embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle('What Setup do u want?')
			.setDescription(
				`${!client.setups.get(message.guild.id, 'aichatsystem.enabled')
					? `**1.** \`Enable AI-Chat\` - *Allows you to Chat with the AI*`
					: `**1.** \`Disable AI-Chat\` - *Disables the AI Chat*`
				}
**2.** \`Set AI-Chat channel\` - *Sets the AI Chat Channel if enabled*
**3.** \`Reset AI Chat System\` - *Resets the AI chat system*
`
			)
			.setFooter('Pick the INDEX NUMBER');
		message.reply({ embeds: [embed]}).then(msg => {
			const filter = m => m.author.id === message.author.id;
			msg.channel
				.awaitMessages({ filter,
					max: 1,
					time: 30_000,
					errors: ['time']
				})
				.then(collected => {
					switch (collected.first().content.toString()) {
						case '1':
							if (!client.setups.get(message.guild.id, 'aichatsystem.enabled')) {
								client.setups.set(message.guild.id, true, 'aichatsystem.enabled');
								message.reply({ content: 'Succesfully enabled the Ai-Chat'});
							} else if (
								client.setups.get(message.guild.id, 'aichatsystem.enabled')
							) {
								client.setups.set(message.guild.id, false, 'aichatsystem.enabled');
								message.reply({ content: 'Succesfully disabled the Ai-Chat'});
							} else {
								message.reply({ content: 'Something went wrong'});
							}
							break;
						case '2':
							if (!client.setups.get(message.guild.id, 'aichatsystem.enabled')) {
								return message.channel.send({ content: 
									'Please enable the chat system **First**!!'
								});
							} else {
								message.channel.send({ embeds: [
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
								]});
								startMessageCollectors(client, message, args);
								function startMessageCollectors(client, message, args) {
									let channelFilter = m => m.author.id === message.author.id;
									let cacheFilter = message.channel;
									let channelCollector = new Discord.MessageCollector({
										cacheFilter,
										channelFilter,
										 max: 999 
										}
									);

									channelCollector.on('collect', async msg => {
										let channel = msg.mentions.channels.first();
										if (msg.content.toLowerCase() === 'cancel') {
											msg.channel.send({ content: 
												'The AI-Chat system setup has been stopped.Run the command again to start a new one!!'
											});
											channelCollector.stop();
											return;
										} else if (!channel) {
											await msg.channel.send({ content: 
												':x: Setup cancelled.Please mention a valid channel!!'
											});
											await channelCollector.stop();
											return;

										} else {
											cleint.setups.set(
												message.guild.id,
												channel.id,
												'aichatsystem.channel'
											);
											message.channel.send({ content: 
												'Successfully set the AI-Chat system to ' +
												channel.toString()
											});
											channelCollector.stop();
										}
									});
								}
							}
							break;
						case "3":
							client.setups.set(message.guild.id, {
								enabled: false,
								channel: "",
							}, "aichatsystem");
							message.reply({ content: "Succesfully resetted Ai Chat Setup"});
							break;
						default:
							message.reply({ content: 'SORRY, that Number does not exists :('});
							break;
					}
				})
				.catch(error => {
					console.log(error);
					return message.reply({ content: '⌛ Sorry but your time ran out'});
				});
		});
	}
};
