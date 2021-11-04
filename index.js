require("dotenv").config();
/*
 *
 * @Information - Express Site
 *  
 */
const express = require('express')
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hey there!'))
app.listen(port, () =>
  console.log(`Your app is listening a http://localhost:${port}`)
);
/** */
const {
  Client,
  Collection,
  Intents
} = require('discord.js');
const config = require("./configs/config.json");
const fs = require("fs");
const emojis = require("./configs/emojis.json");
const client = new Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  presence: {
    status: "idle"
  }
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.emotes = emojis;
client.config = config;

client.categories = fs.readdirSync(`./commands`);
["eventHandler", "commandHandler", "slashCommandHandler", "antiCrashHandler"]
    .forEach(handler => {
        require(`./handlers/${handler}`)(client);
    });

client.login(process.env.TOKEN);

//client CODED BY: Felix_PlaYz#1000
//DO NOT SHARE WITHOUT CREDITS!