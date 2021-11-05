const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms");
const pms = require("pretty-ms");

module.exports = {
  config: {
	name: 'alt-config',
	aliases: ["a-con"],
	category: "admin",
	description: "Configure alt adding in the server",
	usage: "alt-config",
  },
	run: async (bot, message, args) => {
		if (!message.member.hasPermission('MANAGE_GUILD'))
			return message.channel.send(
				`You must have the \`MANAGE_GUILD\` permission in order to execute the command.`
			);
			db.set(`bypass.${message.guild.id}`, []);
			
		let option = args[0];
		let options = ['punishment', 'age', 'logs', 'show', "disable"];
		if (!option)
			return message.channel.send(
				`:x: | The option argument must be one of:\n **${options.join(', ')}**`
			);
		function check(opt) {
			return options.includes(opt);
		}
		if (!check(option.toLowerCase())) {
			return message.channel.send(':x: | **The provided option is invalid**');
		}
		switch (option.toLowerCase()) {
			case 'punishment':
				const punishment = args[1];
				const punishments = ['kick', 'ban'];
				if (!punishment)
					return message.channel.send('Please enter a punishment');
				if (!punishments.includes(punishment))
					return message.channel.send(
						`The **punishment** argument must be one of these:\n${punishments
							.map(x => `**${x}**`)
							.join(', ')}`
					);
				db.set(`punishment.${message.guild.id}`, punishment);
				return message.channel.send(
					`The punishment for **${
						message.guild.name
					}** has been set to: **${punishment}**`
				);
				break;
			case 'age':
			let days = args[1]
			if(!days) return message.channel.send("Please specify a valid day, it also must be a number. Ex- alt-config age 7");
			if(isNaN(days)) return message.channel.send("Please specify a valid day, it also must be a number");
		let day = Number(days)
    
    if(day > 100) return message.channel.send("Please donot exceed the length of 100 days..");
				db.set(`age.${message.guild.id}`, days);
				return message.channel.send(
					`The required age has been set to **${days}** days`
				);
				break;
			case 'logs':
				const channel = message.mentions.channels.first();
				if (!channel)
					return message.channel.send(':x: | **Specify the channel**');
				db.set(`logs.${message.guild.id}`, channel.id);
				return message.channel.send(
					'**The logs channel has been set to** ' + channel.toString()
				);
				break;
			case 'show':
				let logs = db.get(`logs.${message.guild.id}`) || 'None';
				let punish = db.get(`punishment.${message.guild.id}`) || 'None';
				const humanizeDuration = require('humanize-duration');
				let ageee = db.get(`age.${message.guild.id}`) || 0;
				let embed = new Discord.MessageEmbed()
					.setTitle('Anti alt configuration')
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.addField(`Punishment`, punish)
					.addField(`Age`, `${ageee} days`)
					.addField(
						`Logs Channel`,
						`${logs !== 'None' ? `<#${logs}>` : 'None'}`
					)
					.setColor('RANDOM')
					.setFooter(
						message.guild.name,
						message.guild.iconURL({ dynamic: true })
					);
				return message.channel.send({ embed: embed });
				break;
				case 'disable':
				  check = db.get(`logs.${message.guild.id}`) && db.get(`punishment.${message.guild.id}`) && db.get(`age.${message.guild.id}`)
				   
				if(!check) {
				 return message.channel.send("Please set the required fields first or i cant disable it!!");
				} else {
			 db.delete(`logs.${message.guild.id}`);
			 db.delete(`punishment.${message.guild.id}`);
			 db.delete(`age.${message.guild.id}`);
			return message.channel.send("Disabled the Anti-Alt logging in the server :)");
				}
				
		}
		
		function parseMs(str) {
		const parts = str.split(' ');
		const msParts = parts.map(part => ms(part));
		if (msParts.includes(undefined)) return undefined;
		const res = msParts.reduce((a, b) => a + b);
		return res;
	}
	function decodeMs(num) {
		return pms(num);
	}
	}
};