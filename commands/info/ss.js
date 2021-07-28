const { Message, MessageEmbed } = require("discord.js");
//const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("old-wio.db");
const moment = require("moment");
const fetch = require("node-fetch");

const url = require("url");

module.exports = {
  config: {
  name: "ss",
  aliases: ["screenshot"],
  category: "info",
  description: "Takes a screenshot of any webpage.",
  usage: "screenshot <URL>",
  },
  run: async (bot, message, args) => {

    message.delete();
    const user = message.author.tag
    const urls = args[0];
    if (!urls)
      return message.channel
        .send(`\`\`\`\n${user},where is the link -_-\n\`\`\``)
        .then(m => m.delete({ timeout: 5000 }).catch(e => {}));

 if (urls.length < 8)
      return message
        .reply(
          "https is too short to reach - 8 limit"
        )
        .then(m => m.delete({ timeout: 9000 }).catch(e => {}));

    message.channel.send("Please Wait....").then(m => m.delete({
      timeout: 3000
    }).catch(e => console.log(e)));

    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );

      return message.channel.send(
        `\`\`\`\nHere is a screenshot from requested URL\n\`\`\``,
        {
          files: [{ attachment: body, name: "Screenshot.png" }]
        }
      );
    } catch (err) {
      if (err.status === 404)
        return message.channel
          .send("Could not find any results. Invalid URL?")
          .then(m => m.delete({ timeout: 14000 }).catch(e => {}));
      return message
        .reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
    }
  }
};
