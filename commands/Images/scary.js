const Discord = require('discord.js');
const config = require('../../configs/config.json');
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(config.AME_API);

module.exports = {
    name: 'scary',
    category: "Images",
    description: 'Editing image and send scary one!',
    aliases: [""],
    usage: '',
    cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

    run: async (client, message, args) => {

        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send({ content: "**Please Wait...**"});
        let buffer = await AmeAPI.generate("scary", {
            url: user.user.displayAvatarURL({
                format: "png",
                size: 2048
            })
        });
        let attachment = new Discord.MessageAttachment(buffer, "scary.png");
        setTimeout(() => m.delete(), 1000);
        message.channel.send({
            files: [attachment]
        });
    }
}