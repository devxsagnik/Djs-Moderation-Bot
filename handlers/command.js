const fs = require('fs');

module.exports = (bot) => {
    const load = dirs => {
        const commands = fs.readdirSync(`./commands/${dirs}/`).filter(cmd => cmd.endsWith('.js'));
        for (let cmd of commands) {
            let pull = require(`../commands/${dirs}/${cmd}`);
            bot.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(cmd => bot.aliases.set(cmd, pull.config.name));
        };
    };
    ["admin", "fun", "images", "utility", "owner", "mod", "fun", "info", "ai-chat"].forEach(cmd => load(cmd));
};