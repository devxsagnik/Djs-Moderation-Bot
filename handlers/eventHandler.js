const {
    readdirSync
} = require("fs");

module.exports = async (client) => {

    try {
        let amount = 0;
        const registrar = (dir) => {
            const docEntry = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
            for (const file of docEntry) {
                try {
                    const event = require(`../events/${dir}/${file}`)
                    let eventHandle = file.split(".")[0];
                    allevents.push(eventHandle);
                    client.on(eventHandle, event.bind(null, client));
                    amount++;
                } catch (e) {
                    console.log(e)
                }
            }
        }
        await ["client", "guild"].forEach(e => registrar(e));
        console.log(`Logging into client ${client.user.username}`.bgYellow)
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
}