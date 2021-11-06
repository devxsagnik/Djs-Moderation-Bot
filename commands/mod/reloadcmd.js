const Discord = require("discord.js")
const { readdirSync } = require("fs");
const { OWNER_ID } = require("../../config");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "reloadmod",
        category: "owner",
        description: "Reload command- Dev Only",
        aliases: ['rmod']
    },

    run: async (bot, message, args) => {
        if(message.author.id != OWNER_ID) {
          const rembed = new MessageEmbed()
          .setTitle("Error")
          .setDescription(":x: You are not authorized to use this command as it is resticted to the owner only")
          .setColor("#FF0000")
          .setFooter(message.author.username, bot.user.displayAvatarURL())
          .setTimestamp();
        message.channel.send(rembed).then(m => m.delete({
          timeout: 7500
        })
        );
        } else {
       
        if(!args[0]) return message.channel.send("Please provide a command name!")

        let commandName = args[0].toLowerCase()

        try {
          
          delete require.cache[require.resolve(`./${commandName}.js`)]
          const pull = require(`./${commandName}.js`)
          bot.commands.set(pull.config.name, pull)
          message.channel.send(`Successfully reloaded: \`${commandName}\``)
        }

        catch (e) {
          console.log(e)
          return message.channel.send(`Could not Reload Command: ${commandName} From Moderation Module Because: \n${e}`)
        }

}
      }
} 