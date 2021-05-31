require("dotenv").config();
console.log("Bot coded by Felix_Playz#1000\nLoaded Moderation Bot v2.0");
//Defining dependencies
const { Client, Collection } = require('discord.js');
const { PREFIX } = require('./config.js');
const discord = require("discord.js");
const moment = require("moment");
const ms = require('ms');
const pms = require('pretty-ms');
const { LeftImage, JoinImage } = require("./config.json");
const canvas = require ("discord-canvas");
const Canvas = require("canvas");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const format = require(`humanize-duration`);
const fetch = require("node-fetch");
const config = require("./config.json");
const wb = require("quick.db");
const bot = new Client({ disableMentions: 'everyone',
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const fs = require("fs");
const db = require('old-wio.db');
const emojis = require("./emojis.json");

bot.commands = new Collection();
bot.aliases = new Collection();
bot.emotes = emojis;
bot.config = config;

["aliases", "commands"].forEach(cmd => bot[cmd] = new Discord.Collection());
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.queue2 = new Map();
bot.queue3 = new Map();
bot.queue = new Map();
bot.games = new Map();

 bot.on('ready', () => {
   const express = require('express')
   const app = express();
   const port = 3000;

app.get('/', (req, res) => res.send('Hey there!'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);
	console.log(`[INFO]: Ready on client (${bot.user.tag})`);
	console.log(
		`[INFO]: watching ${bot.guilds.cache.size} Servers, ${
			bot.channels.cache.size
		} channels & ${bot.users.cache.size} users`
	);
	console.log('-------------------------------------');
	const botpresence = bot.config.activity;
	
	const active = botpresence.replace(/{server}/g, `${bot.guilds.cache.size}`).replace(/{channels}/g, `${bot.channels.cache.size}`).replace(/{users}/g, `${bot.guilds.cache.reduce((users , value) => users + value.memberCount, 0)}`).replace(/{prefix}/g, `${PREFIX}`);
	
	const bottype = bot.config.type;
	
	bot.user.setPresence({
    status: bot.config.status,
    activity: {
        name: active,
        type: bottype
    }
});
});
const Enmap = require("enmap");

bot.setups = new Enmap({ name: "setups", dataDir: "./databases/setups" }); 

bot.on("message", async message => {
 
 
  if (message.author.bot || !message.guild || message.webhookID) return;
  
  let Prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (!Prefix) Prefix = PREFIX;

const mentionRegex = RegExp(`^<@!?${bot.user.id}>$`);
     
  if (message.content.match(mentionRegex)) {
    message.channel.send(
      new Discord.MessageEmbed()
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
      .setDescription(`Hey <@${message.author.id}>, My prefix for this guild is \`\`\`${Prefix}\`\`\`.Use \`\`\`${Prefix}help\`\`\` or <@${bot.user.id}> help to get a list of commands`)
       .setColor("RANDOM")
       .setFooter(`Requested by ${message.author.username}`)
       .setTimestamp()
  )};

  if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.fetch(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`aftime-${message.author.id}+${message.guild.id}`)
        message.channel.send(`Welcome back ${message.author.username}, Great to see you!!`)
    }
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
          const reason = db.fetch(`afk-${message.mentions.members.first().id}+${message.guild.id}`);
          let time = db.fetch(`aftime-${message.mentions.members.first().id}+${message.guild.id}`);
				time = Date.now() - time;
           return message.channel.send(`**${message.mentions.members.first().user.username} is now afk - ${reason} - ${format(
						time
					)} ago**`);
        }
    }
    
    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(Prefix)})\\s*`);

    if(!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
     Prefix = matchedPrefix;

    
    if(!message.content.startsWith(Prefix)) return;
    
     if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
        return message.reply("**:x: I am missing the Permission to `EMBED_LINKS`**");

  let args = message.content
    .slice(matchedPrefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();
  
  if (cmd.length === 0) return;

  let cmdx = wb.fetch(`cmd_${message.guild.id}`)

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) message.channel.send(cmdy.responce.replace(/{user}/g, `${message.author}`)

	 .replace(/{user_tag}/g, `${message.author.tag}`)
        .replace(/{user_name}/g, `${message.author.username}`)
        .replace(/{user_ID}/g, `${message.author.id}`)
        .replace(/{guild_name}/g, `${message.guild.name}`)
        .replace(/{guild_ID}/g, `${message.guild.id}`)
        .replace(/{memberCount}/g, `${message.guild.memberCount}`)
        .replace(/{size}/g, `${message.guild.memberCount}`)
        .replace(/{guild}/g, `${message.guild.name}`)
        .replace(/{member_createdAtAgo}/g, `${moment(message.author.createdTimestamp).fromNow()}`)
        .replace(/{member_createdAt}/g, `${moment(message.author.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`)
  )};
  
  let ops = {
            queue2: bot.queue2,
            queue: bot.queue,
            queue3: bot.queue3,
            games: bot.games
        }

  let command =
    bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
  
  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;

  if (!command)
    return;

   if (command) {
     command.run(bot, message, args, ops);
   } else {
     command.run(bot, message, args)
   }
   
});

bot.on("message", async message => {
      let disabled = new MessageEmbed()
    .setColor("#FF0000")
    .setDescription("Chat Bot is disabled by the Owner in this Server!")
    .setFooter(`Requested by ${message.author.username}`)
  
        if(message.author.bot || !message.guild) return;
        bot.setups.ensure(message.guild.id,  {
          enabled: false,
          channel: "",
      }, "aichatsystem");
       
        let chatbot = bot.setups.get(message.guild.id, "aichatsystem");
      
    if(message.channel.id == chatbot.channel){
      if(!chatbot.enabled) return message.author.send(disabled).catch(e => console.log(e));
      
      if(message.attachments.size > 0)
        return message.channel.send("Hey buddy! I cannot read files :(\nPlease try to keep it in chat..")
     
      fetch(`http://api.brainshop.ai/get?bid=${bot.config.bid}&key=${bot.config.key}&uid=1&msg=${encodeURIComponent(message)}`)
     .then(res => res.json())
     .then(data => {
     message.channel.send(new MessageEmbed()
     .setTitle(bot.user.username, bot.user.displayAvatarURL())
     .setDescription(`Your Message : **${message}**\nMy Message : **${data.cnt}**`)
     .setColor("RANDOM")
     .setFooter(`Talking with ${message.author.username}`, message.author.displayAvatarURL({
       dynamic: true
     }))
     ).catch(e => console.log(e));
     });
    }
});

bot.on("guildMemberAdd", async member => {
  if(!member.guild) return;
//autorole -->
bot.setups.ensure(member.guild.id, {
  roles: []
}, "welcome");

let roles = bot.setups.get(member.guild.id, "welcome.roles");
      
      if(roles.length >= 1) {

        for(let i = 0; i < roles.length; i++){
          try{
            
            let roleadd = member.guild.roles.cache.get(roles[i])
             member.roles.add(roleadd.id);
          } catch (e) {
            console.log(e)
          } 
        }
        }
  let toggle = await db.fetch(`Weltog_${member.guild.id}`);
  let togEm = await db.fetch(`Welemtog_${member.guild.id}`);
  
  //code -->
  
  
  if(toggle === true) {
    
    if (togEm === true) {
      try {
      let sChannel = await db.fetch(`Welcome_${member.guild.id}_Channel`);
  if (!sChannel) return;
  let sMessage = await db.fetch(`Welcome_${member.guild.id}_Msg`);
  if (!sMessage) sMessage = `Welcome To The Server!`;
  let sWelcomeImage = await db.fetch(`WelIm_${member.guild.id}`);
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let sMsg = sMessage.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_id}/g, `${member.id}`)
        .replace(/{server_name}/g, `${member.guild.name}`)
        .replace(/{server_id}/g, `${member.guild.id}`)
        .replace(/{membercount}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{user_createdAgo}/g, `${moment(member.user.createdTimestamp).fromNow()}`)
        .replace(/{user_createdAt}/g, `${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`);
        
  let sWelcomed = new canvas.Welcome();
  let sImage = await sWelcomed
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
  .setMemberCount(member.guild.memberCount)
  .setBackground(sWelcomeImage || JoinImage)
  .toAttachment();
  
  let attachment = new Discord.MessageAttachment(sImage.toBuffer(), "welcome.png");
  
  const Embed = new MessageEmbed()
  .setDescription(sMsg)
  .attachFiles([attachment])
  .setImage('attachment://welcome.png')
  .setColor("RANDOM");
  return bot.channels.cache.get(sChannel).send(Embed);
  
      } catch (e) {
        console.log(e);
      }
  
    } else {
  
    try {
  let Channel = await db.fetch(`Welcome_${member.guild.id}_Channel`);
  if (!Channel) return;
  let Message = await db.fetch(`Welcome_${member.guild.id}_Msg`);
  if (!Message) Message = `Welcome To The Server!`;
  let WelcomeImage = await db.fetch(`WelIm_${member.guild.id}`);
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let Msg = Message.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_id}/g, `${member.id}`)
        .replace(/{server_name}/g, `${member.guild.name}`)
        .replace(/{server_id}/g, `${member.guild.id}`)
        .replace(/{membercount}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{user_createdAgo}/g, `${moment(member.user.createdTimestamp).fromNow()}`)
        .replace(/{user_createdAt}/g, `${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`)
        
  let Welcomed = new canvas.Welcome();
  let Image = await Welcomed
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
  .setMemberCount(member.guild.memberCount)
  .setBackground(WelcomeImage || JoinImage)
  .toAttachment();
  
  let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
  return bot.channels.cache.get(Channel).send(Msg, Attachment);

  } catch (e) {
    console.log(e);
  }
    }
  } else {
    return;
  }
  });

  bot.on("guildMemberRemove", async member => {
   
   let toggle = await db.fetch(`leavtog_${member.guild.id}`);
   let togEm = await db.fetch(`leavemtog_${member.guild.id}`);
   
   if(toggle === true) {
     
     if (togEm === true) {
     
      try {
      let sChannel = await db.fetch(`Leave_${member.guild.id}_Channel`);
  if (!sChannel) return;
  let sMessage = await db.fetch(`Leave_${member.guild.id}_Msg`);
  if (!sMessage) sMessage = `${member.user.username} Has Left The Server!`;
  let sLeaveImage = await db.fetch(`Leaveim_${member.guild.id}`);
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let sMsg = sMessage.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_id}/g, `${member.id}`)
        .replace(/{server_name}/g, `${member.guild.name}`)
        .replace(/{server_id}/g, `${member.guild.id}`)
        .replace(/{membercount}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{user_createdAgo}/g, `${moment(member.user.createdTimestamp).fromNow()}`)
        .replace(/{user_createdAt}/g, `${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`);
        
  let sLeaved = new canvas.Goodbye();
  let sImage = await sLeaved
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
  .setMemberCount(member.guild.memberCount)
  .setBackground(sLeaveImage || JoinImage)
  .toAttachment();
  
  let attachment = new Discord.MessageAttachment(sImage.toBuffer(), "leave.png");
  
  const Embed = new MessageEmbed()
  .setDescription(sMsg)
  .attachFiles([attachment])
  .setImage('attachment://leave.png')
  .setColor("RANDOM");
  return bot.channels.cache.get(sChannel).send(Embed);
  
      } catch (e) {
        console.log(e);
      }
     } else {
   try {
     
  let Channel = await db.fetch(`Leave_${member.guild.id}_Channel`);
  if (!Channel) return;
  let Message = await db.fetch(`Leave_${member.guild.id}_Msg`);
  if (!Message) Message = `${member.user.username} Has Left The Server!`;
 let LeaveImage = await db.fetch(`Leaveim_${member.guild.id}`);
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let Msg = Message.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_id}/g, `${member.id}`)
        .replace(/{server_name}/g, `${member.guild.name}`)
        .replace(/{server_id}/g, `${member.guild.id}`)
        .replace(/{membercount}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{user_createdAgo}/g, `${moment(member.user.createdTimestamp).fromNow()}`)
        .replace(/{user_createdAt}/g, `${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`);
        
  let Leaved = new canvas.Goodbye();
  let Image = await Leaved
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
  .setMemberCount(member.guild.memberCount)
  .setBackground(LeaveImage || LeftImage)
  .toAttachment();
  
  let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "leave.png");
  return bot.channels.cache.get(Channel).send(Msg, Attachment);

   } catch (e) {
    console.log(e);
  }
    }
  } else {
    return;
  }
  });

bot.on('guildMemberAdd', async member => {
    if(!member.guild) return;
	let age = await wb.get(`age.${member.guild.id}`);
	let logs = await wb.get(`logs.${member.guild.id}`);
	let punishment = wb.get(`punishment.${member.guild.id}`);
	let bypassed = await wb.get(`bypass.${member.guild.id}`);
	if(!bypassed.includes(member.id)) {
	
	let day = Number(age)
    let x = Date.now() - member.user.createdAt;
    let created = Math.floor(x / 86400000);
	
	if (day >= created) {
		member[punishment](
			`Alt detected - Account younger than ${day} days`
		);
		let channel = await bot.channels.cache.get(logs);
		let embed = new discord.MessageEmbed()
			.setTitle(`Suspicious! Account age less than ${day} days`)
			.addField(`Member Username`, member.toString())
			.addField(`Member ID`, member.id)
			.addField(
				`Account Age`, moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
      .addField(`Punishment`, punishment)
			.setColor('#FF0000')
			.setFooter(
				member.guild.name,
				member.guild.iconURL({ dynamic: true })
			);
		if (channel) channel.send({ embed: embed });
	}
	}
});

function parseMs(str) {
		const parts = str.split(' ');
		const msParts = parts.map(part => ms(part));
		if (msParts.includes(undefined)) return undefined;
		const res = msParts.reduce((a, b) => a + b);
		return res;
	};

function decodeMs(num) {
		return pms(num);
	};



bot.login(process.env.TOKEN);

//BOT CODED BY: Felix_PlaYz#1000
//DO NOT SHARE WITHOUT CREDITS!
