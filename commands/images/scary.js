const Discord = require('discord.js');
const config = require('../../config.json');
const Amebot = require('amethyste-api');
const AmeAPI = new Amebot(config.AME_API);

module.exports = {
    config: {
        name: 'scary',
        description: 'Editing image and send scary one!',
        aliases: [""],
        usage: '',
        category: 'images',
    },
    run: async (bot, message, args) => {
    
        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send("**Please Wait...**");
        let buffer = await AmeAPI.generate("scary", { url: user.user.displayAvatarURL({ format: "png", size: 2048 }) });
        let attachment = new Discord.MessageAttachment(buffer, "scary.png");
        m.delete({ timeout: 5000 });
        message.channel.send(attachment);

    }
};