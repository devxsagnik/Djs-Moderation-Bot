const db = require("quick.db");

module.exports = {
  config: {
	name: 'bypass-alt',
	aliases: ["b-alt"],
	description: "Add users who can bypass the alt system",
	category: "admin",
	usage: "bypass-alt <option>",
},
	run: async (bot, message, args) => {
		let options = ['add', 'remove'];
		function check(opt) {
			return options.some(x => x === opt);
		}
		async function fetchUser(ID) {
			let user = await bot.users.cache.get(ID);
			return user;
		}
		async function checkUser(ID) {
			let user = await fetchUser(ID);
			if (!user) return false;
			else return true;
		}
		let option = args[0];
		let ID = args[1];
		if (!option)
			return message.channel.send(
				`:x: | **The option must be one of ${options.join(', ')}**`
			);
		if (!ID)
			return message.channel.send(`:x: | **The ID is a required argument**`);
		if (!check(option.toLowerCase()))
			return message.channel.send(
				`:x: | **The option arugument must be one of ${options.join(', ')}**`
			);
		switch (option.toLowerCase()) {
			case 'add':
				if (!checkUser(ID))
					return message.channel.send(`:x: | **The user doesnt exist**`);
				else {
					let user = await fetchUser(ID);
          let pog = db.get(`bypass.${message.guild.id}`);
					db.push(`bypass.${message.guild.id}`, user.id);
						let data = pog.find(x => x === ID);
						if (data)
							return message.channel.send(
								'**The user is already on the bypass list**'
							);
					return message.channel.send(
						`${user.tag} has been added to the bypass list`
					);
				}
				break;
			case 'remove':
				if (!checkUser(ID))
					return message.channel.send(`:x: | **The user doesnt exist**`);
				else {
					let user = await fetchUser(ID);
					let pog = db.get(`bypass.${message.guild.id}`);
					if (pog) {
						let data = pog.find(x => x === ID);
						if (!data)
							return message.channel.send(
								'**The user is not on the bypass list**'
							);
						let index = pog.indexOf(data);
						db.delete(`bypass.${message.guild.id}`, data)
						var filter = pog.filter(x => {
							return x != null && x != '';
						});
						db.set(`bypass.${message.guild.id}`, filter);
					}
					return message.channel.send(
						`${user.tag} has been deleted from the bypass list`
					);
				}
				break;
		}
	}
};
