const db = require("quick.db");

module.exports = {
  config: {
  name: "addcc",
  aliases: ["a-cmd"],
  usage: "addcmd <cmd_name> <cmd_responce>",
  description: "add guild custom commands",
  category: "admin",
  },
  run: async (client, message, args) => {


    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: You need `MANAGE_MESSAGES` perms to use this command")

    let cmdname = args[0];

    if(!cmdname) return message.channel.send(`:x: You have to give command name, \`addcmd <cmd_name> <cmd_responce>\`
    `);

    let cmdresponce = args.slice(1).join(" ");

    if(!cmdresponce) return message.channel.send(`:x: You have to give command cmd responce, \`addcmd <cmd_name> <cmd_responce>\`\n\n**You can add the following variables - \n\`{user}\` - Author\n\`{user_tag}\` - Author Tag\n\`{user_name}\` - Author Username\n\`{user_ID}\` - Author ID\n\`{guild_name}\` - Guild Name\n\`{guild_ID}\` - Guild Id\n\`{memberCount}\` - Member Count\n\`{member_createdAtAgo}\` - Member Creation Time\n\`{member_createdAt}\` - Member Creation Date`);

    let database = db.fetch(`cmd_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send(":x: This command name is already added in guild custom commands.")

    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    }

    db.push(`cmd_${message.guild.id}`, data)

    return message.channel.send("Added **" + cmdname.toLowerCase() + "** as a custom command in guild.")


  }
}