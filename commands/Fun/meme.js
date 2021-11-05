const { MessageEmbed } = require('discord.js');
const Random = require("srod-v2");

module.exports = {
config: {
    name: 'meme',
    category: 'fun',
    description: 'Get some cool memes :)',
    usage: 'memes',
    aliases: [''],
},
    run: async(bot, message, args) => {
        let data = await Random.GetMeme();
        message.channel.send(data);
    }
};