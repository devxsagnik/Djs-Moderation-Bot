const axios = require('axios');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "cat",
    category: "Images",
    description: "Get a random cat image",
    aliases: [" "],
    usage: "cat",
    cooldown: 1,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],

    run: async (client, message, args) => {

        const url = "https://some-random-api.ml/img/cat";
        const facts = "https://some-random-api.ml/facts/cat"

        let image, response;
        let fact, responses;
        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send({
                content: `An error occured, please try again!`
            })
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Cat Image and Fact`)
            .setColor(`#BLURPLE`)
            .setDescription(fact.fact)
            .setImage(image.link)

        await message.channel.send({
            embeds: [embed]
        });
    }
}