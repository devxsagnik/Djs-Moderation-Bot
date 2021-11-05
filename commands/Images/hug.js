const {
    MessageEmbed
} = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "hug",
    category: "Images",
    description: "Get random hug image",
    aliases: [" "],
    usage: "hug <@user>",
    cooldown: 1,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],

    run: async (client, message, args) => {

        const url = 'https://some-random-api.ml/animu/hug';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`@${message.author.username} hugs @${message.mentions.users.first() ? message.mentions.users.first().username : "Ghost"}`)
            .setImage(data.link)
            .setColor("BLURPLE")

        await message.channel.send({
            embeds: [embed]
        })
    }
}