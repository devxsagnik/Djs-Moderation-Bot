const db = require("quick.db");
const ReactionMenu = require("../../modules/ReactionMenu");
const moment = require('moment');
const discord = require("discord.js");

module.exports = {
  config: {
	name: 'fetch-alts',
	aliases: ["f-alts"],
	category: "admin",
	description: "Fetch all the alts",
	usage: "fetch-alts",
},
	run: async (bot, message, args) => {
		const Discord = require('discord.js');
		
		message.bot = bot;

	   let days = args[0];
      if(!days) return message.channel.send("Please provide a valid days duration");
      
      if(isNaN(days)) return message.channel.send("Please provide a valid Days Duration");
    
      let day = Number(days);

    if(day > 100) return message.channel.send("You may only find alts of an account age of **100 days** or below");
    
    let array = []

    message.guild.members.cache.forEach(async(user)=>{

    let math = day * 86400000

    let x = Date.now() - user.user.createdAt;
    let created = Math.floor(x / 86400000);
      
    if(day >= created) {

    array.push(`${user} (${user.user.tag} | ${user.id})\nCreated At: **${user.user.createdAt}**`)
    }
   
    })

    const interval = 10;

    const embed = new discord.MessageEmbed()
    .setTitle(`Alt Detector - Account age < ${days} Days`)
    .setDescription(array.join("\n\n") || "No alts found")
    .setColor("RANDOM")

    if (array.length <= interval) {
    
    const range = (array.length == 1) ? '[1]' : `[1 - ${array.length}]`;
      message.channel.send(embed
        .setTitle(`Alt Detector - Account age < ${days} Days`)
        .setDescription(array.join('\n\n'))
      );

    } else {

      embed
        .setTitle(`Alt Detector - Account age < ${days} Days`)
        .setFooter(message.author.tag,  
          message.author.displayAvatarURL({ dynamic: true })
        );
    new ReactionMenu(message.bot, message.channel, message.member, embed, array, interval);
    }
  }
  
};