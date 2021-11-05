const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
          name: "svr",
          description: "Set the server region for the server! \nAvailable Server IDs: \nbz : Brazil, \nhk : HongKong, \nind : India, \njp : Japan, \nrus : Russia, \nsng : Singapore, \nsa : South Africa, \nsyd : Sydney, \nusc : US-Central, \nuse : US-East, \nuss : US-South, \nusw : US-West, \neur : Europe",
          usage: "+svr <region ID>",
          category: 'admin',
          example: "+svr jp",
          aliases: ['svr'],  
        
},
  run: async (bot, message, args) => {
  
    if (!message.member.hasPermission("MANAGE_GUILD") && !ownerID.includes(message.author.id)) return message.channel.send("You Don't Have Sufficient Permissions!- [MANAGE_GUILD]");

    let serverRegion = args.slice(0).join(' ');
    
    var availableRegions = ['bz', 'hk', 'jp', 'rus', 'sng', 'sa', 'syd', 'ind', 'usc', 'use', 'usw', 'uss', 'eur'];
    
    if(!serverRegion) {
      message.channel.send(`Please provide a server ID\n**Available IDS - **\n${availableRegions}`)
    }

    if(availableRegions.includes(serverRegion)) {
      try {
        const serverAliases = {
          'bz' : "brazil",
          'hk' : "hongkong",
           'ind' : "india",
          'jp' : "japan",
           'rus' : "russia",
           'sng' : "singapore",
          'sa' : "southafrica",
           'syd' : "sydney",
           'usc' : "us-central",
           'use' : "us-east",
           'uss' : "us-south",
           'usw' : "us-west",
           'eur' : "europe"
         }
        await message.guild.setRegion(serverAliases[serverRegion])
        message.channel.send(`Done ✅ | Server Region changed to ${serverAliases[serverRegion]}`)
        
      }

      catch(error) {
        console.log(error)
        message.channel.send(`Oops ❌ | An error occured!`)
      }
    }

  },
};