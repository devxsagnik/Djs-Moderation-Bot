const { MessageEmbed } = require("discord.js");
const db = require("old-wio.db");
const { PREFIX } = require("../../config.js");

module.exports = {
  config: {
    name: "help-greetings",
    aliases: ["h-greet"],
    category: "admin",
    description: "Shows the setup of welcome and leave",
    usage: "help-greetings",
  },
  run: async(bot, message, args) => {
    const hembed = new MessageEmbed()
    .setTitle("Error")
    .setDescription(":x: You are not authorized to use this command :(")
    .setColor("#FF0000")
    .setTimestamp();
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(hembed);
    } else {
      try {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if(!prefix) prefix = PREFIX;
        
        const embed = new MessageEmbed()
        .setTitle("Greetings Setup")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(`**Welcome to the setup.**\nHere are the parameters available which you can set for the greeting message, background image and will it be a embed or not.\n\n**Commands available-**\n\`\`\`${prefix}greet-toggle\`\`\` - Sets the Welcome/leave greeting to on/off on the behalf parameter\n\`\`\`${prefix}greet-embed-toggle\`\`\` - Sets Welcome/leave to be sent in embed or not\n\`\`\`${prefix}set-greet-message\`\`\` - Sets the welcome/leave message text\n\`\`\`${prefix}set-greet-bg\`\`\` - Sets the background image of the welcome/leave\n\`\`\`${prefix}set-greet-channel\`\`\` - Sets the greet for Welcome/leave to the specified channel!!`)
        .addField("Parameters you can use in message of Welcome/leave -", "```{user}``` - Mentions the joining or leaving member\n```{user_name}``` - Just gives the username of the join/leave member\n```{user_tag}``` - Shows the user tag. Ex - User#1234\n```{user_id}``` - Shows the user id\n```{server_name}``` - Shows the server name\n```{server_id}``` - Shows the server id\n```{membercount}``` - Shows the member count of the server\n```{user_createdAt}``` - Shows member account creation date\n```{user_createdAgo}``` - Shows the member creation time ago")
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));
        message.channel.send(embed);
      } catch (e) {
        console.log(e);
      }
    }
  }
}