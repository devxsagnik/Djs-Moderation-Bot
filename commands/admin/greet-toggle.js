const { MessageEmbed } = require("discord.js");
const db = require("old-wio.db");

module.exports = {
  config: {
    name: "greet-toggle",
    aliases: [""],
    description: "Toggles greeting on/off when member joins/leaves",
    usage: "greet-toggle",
  }, 
  run: async(bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed()
    .setTitle("Error")
    .setDescription(":x: Sorry but you dont have permission to use this command!!")
    .setColor("#FF0000")
    .setTimestamp()
    );
    
   let embed = new MessageEmbed()
   .setColor("RANDOM")
   .setTitle("What Setup do u want?")
   .setDescription(`
   **1.** \`Welcome Toggle\`\n**2.** \`Leave Toggle\``)
   .setFooter("Pick the right number", message.author.displayAvatarURL({
     dynamic: true
   }))
   .setThumbnail(bot.user.displayAvatarURL());
   
   message.reply(embed).then(msg => {
  msg.channel.awaitMessages(m=> m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] }).then(collected=>{
    switch(collected.first().content.toString()){
      case "1":
        welcomesystem();
      break;
      case "2":
        leavesystem();
      break;
      default:
        message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999));
      break;
      }
  }).catch(error=>{
    console.log(error);
    return message.reply("Sorry but your time ran out ⌛!");
   
  });
   });
   function welcomesystem(){
 
  let wembed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Welcome Toggle On\` - *Turns the welcome system on*
**2.** \`Welcome Toggle Off\` - *Turns the welcome system off*
`)
    .setFooter("Pick the INDEX NUMBER");
    
      message.reply(wembed).then(msg => {
      msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
        switch(collected.first().content){
          case "1":
            let check = db.fetch(`Weltog_${message.guild.id}`);
            if(check === null) {
            db.set(`Weltog_${message.guild.id}`, true)
            return message.channel.send(new MessageEmbed()
            .setTitle("Success!!")
            .setColor("RANDOM")
            .setDescription("I have successfully turned on the welcome system in this server")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({
              dynamic: true
            }))
            )
            } else {
             message.channel.send("Welcome system is already turned on!!");
            };
            break;
            case "2":
              let vcheck = db.fetch(`Weltog_${message.guild.id}`);
              if(vcheck === true) {
              db.delete(`Weltog_${message.guild.id}`);
              return message.channel.send(new MessageEmbed()
              .setTitle("Success")
              .setColor("RANDOM")
              .setDescription("I have successfully turned off the welcome system in the server")
              .setTimestamp()
              );
              } else {
                message.channel.send("Please turn on the Welcome system first!!")
              };
              break;
              default:
            message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
          break;
        }
      }).catch(e=>console.log(e))

    });
}

function leavesystem(){
 
  let wembed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Leave Toggle On\` - *Turns the Leave system on*
**2.** \`Leave Toggle Off\` - *Turns the Leave system off*
`)
    .setFooter("Pick the INDEX NUMBER");
    
      message.reply(wembed).then(msg => {
      msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
        switch(collected.first().content){
          case "1":
            let check = db.fetch(`leavtog_${message.guild.id}`);
            if(check === null) {
            db.set(`leavtog_${message.guild.id}`, true)
            return message.channel.send(new MessageEmbed()
            .setTitle("Success!!")
            .setColor("RANDOM")
            .setDescription("I have successfully turned on the Leave system in this server")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({
              dynamic: true
            }))
            )
            } else {
             message.channel.send("Leave system is already turned on!!");
            };
            break;
            case "2":
              let vcheck = db.fetch(`leavtog_${message.guild.id}`);
              if(vcheck === true) {
              db.delete(`leavtog_${message.guild.id}`);
              return message.channel.send(new MessageEmbed()
              .setTitle("Success")
              .setColor("RANDOM")
              .setDescription("I have successfully turned off the Leave system in the server")
              .setTimestamp()
              );
              } else {
                message.channel.send("Please turn on the Leave system first!!")
              }
              break;
              default:
            message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
          break;
        }
      }).catch(e=>console.log(e))

    });
}
  }
}