const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
    name: "slap",
    category: "Images",
    description: "Slap mentioned user",
    aliases: [" "],
    usage: "slap <@user>",
    cooldown: 1,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],

    run: async (client, message, args) => {

        let target1 = message.author

        let target2 = message.mentions.users.first();

        if (!target2) return message.channel.send({
            content: "Please Mention Someone!"
        });

        let avatar = target1.displayAvatarURL({
            dynamic: false,
            format: 'png'
        });

        let avatar2 = target2.displayAvatarURL({
            dynamic: false,
            format: 'png'
        });

        let img = await new DIG.Batslap().getImage(avatar, avatar2)

        let attach = new Discord.MessageAttachment(img, "slap.png");;
        message.channel.send({
            files: [attach]
        });
    }
}