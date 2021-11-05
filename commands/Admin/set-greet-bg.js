const db = require("old-wio.db");
const discord = require("discord.js");
const { MessageEmbed } = require ("discord.js");
const Discord = require("discord.js");

module.exports = {
  config: {
    name: "set-greet-bg",
    aliases: ["set-g-bg"],
    description: "Sets the Welcome/leave background Image",
    usage: "set-greet-bg",
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
   **1.** \`Welcome Background\`\n**2.** \`Leave Background\``)
   .setFooter("Pick the right number", message.author.displayAvatarURL({
     dynamic: true
   }))
   .setThumbnail(bot.user.displayAvatarURL());
   
   message.reply(embed).then(msg => {
  msg.channel.awaitMessages(m=> m.author.id === message.author.id, { max: 1, time: 60000, errors: ['time'] }).then(collected=>{
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
   
   function welcomesystem() {
     let wembed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Set Welcome Background\` - *Sets the Welcome Background Image*
**2.** \`Delete Welcome Background\` - *Delete's the Background image if set*`)
    .setFooter("Pick the INDEX NUMBER");
    
      message.reply(wembed).then(msg => {
      msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["time"]}).then(collected=>{
        switch(collected.first().content){
        
              case "1":
                let qembed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription("Send an image or link below here!!")
                .setColor("RANDOM")
                .setFooter("Background Setup")
                .setTimestamp();
                  
            message.reply(qembed).then(msg => {
                  msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time: 60000,errors: ['time']}).then(collected=>{
                    switch(collected.first().content.toString()){
                      
                      case "1":
                        db.set(`WelIm_${message.guild.id}`, null);
              
              break;
              
              default:
              if (collected.first().attachments.size > 0) {
                         if (collected.first().attachments.every(attachIsImage)){
            
            message.channel.send(new MessageEmbed()
            .setTitle("Success!!")
            .setColor("RANDOM")
            .setDescription("I have successfully seted the welcome image in this server.\n\nPlease make sure to **not** delete your Image from the Channel!")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({
              dynamic: true
            }))
            );
            db.set(`WelIm_${message.guild.id}`, url);
            } else {
              message.reply("Could not set your message as a background image")
                      }
                    }  else if(collected.first().content.includes("https") || collected.first().content.includes("http")) {
                         message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
                         
                  db.set(`WelIm_${message.guild.id}`, collected.first().content)
                       }
                       else {
                         message.reply("Could not your message as a background image");
                 }
            break;
            } 
            function attachIsImage(msgAttach) {
                     url = msgAttach.url;

                     //True if this url is a png image.
                     return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                      url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                      url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                 }
                 }).catch(error=>{
                  console.log(error)
                  return message.reply("SORRY BUT YOUR TIME RAN OUT!")
              })
               });
               break;
               
            case "2":
              let vcheck = db.fetch(`WelIm_${message.guild.id}`);
              if(vcheck === true) {
              db.delete(`WelIm_${message.guild.id}`);
              return message.channel.send(new MessageEmbed()
              .setTitle("Success")
              .setColor("RANDOM")
              .setDescription("I have successfully deleted the Background Image in the server")
              .setTimestamp()
              );
              } else {
                message.channel.send("Please set the Background Image First")
              };
              break;
              default:
            message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
          break;
        }
      }).catch(e=> console.log(e))

    });
 }
 
     function leavesystem() {
     let wembed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Set Leave Background\` - *Sets the Leave Background Image*
**2.** \`Delete Leave Background\` - *Delete's the Background image if set*`)
    .setFooter("Pick the INDEX NUMBER");
    
      message.reply(wembed).then(msg => {
      msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
        switch(collected.first().content){
             
             case"1":
               
         const cembed = new MessageEmbed()
         .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
         .setDescription("Please send a image or link here!!")
         .setFooter("Background Setup")
         .setColor("RANDOM")
         .setTimestamp();
         
            message.reply(cembed).then(msg => {
                  msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                    switch(collected.first().content.toString()){
                      case "1":
                        
            let check = db.fetch(`Leaveim_${message.guild.id}`);
            if(check === null) {
              if (collected.first().attachments.size > 0) {
                         if (collected.first().attachments.every(attachIsImage)){
            
            message.channel.send(new MessageEmbed()
            .setTitle("Success!!")
            .setColo("RANDOM")
            .setDescription("I have successfully seted the welcome image in this server.\n\nPlease make sure to **not** delete your Image from the Channel!")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({
              dynamic: true
            }))
            );
            db.set(`Leaveim_${message.guild.id}`, url);
            } else {
              message.reply("Could not set your message as a background image")
                      }
                    }  else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                         message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
                         
                  db.set(`Leaveim_${message.guild.id}`, collected.first().content)
                       }
                       else {
                         message.reply("Could not your message as a background image") } 
            } else {
             message.channel.send("There's already a Welcome Image seted in the server.If you wanna add a new, Please disable it and then run the setup again!!");
                 }
            break;
            } 
            function attachIsImage(msgAttach) {
                     url = msgAttach.url;

                     //True if this url is a png image.
                     return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                      url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                      url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                 }
                 }).catch(error=>{
                  console.log(error)
                  return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
               });
               break;
               
            case "2":
              let vcheck = db.fetch(`Leaveim_${message.guild.id}`);
              if(vcheck === true) {
              db.delete(`Leaveim_${message.guild.id}`);
              return message.channel.send(new MessageEmbed()
              .setTitle("Success")
              .setColor("RANDOM")
              .setDescription("I have successfully deleted the Background Image in the server")
              .setTimestamp()
              );
              } else {
                message.channel.send("Please set the Background Image First")
              };
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