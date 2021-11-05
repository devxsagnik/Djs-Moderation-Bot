const Discord = require("discord.js");
const {
    Client,
    Message,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "wanted",
    category: "Images",
    description: "Make yourself wanted or anyone",
    aliases: [""],
    usage: "wanted",
    cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const avatar = user.displayAvatarURL({
            format: "png"
        });

        const image = await Canvas.wanted(avatar);

        let acct = new MessageAttachment(image, "wanted.png");

        message.channel.send({
            files: [acct]
        });
    }
}
