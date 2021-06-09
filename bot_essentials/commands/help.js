const discord = require('discord.js');
const {prefix} = require(`../config.json`);
module.exports = {
  name: "help",
  description: "Information about the arguments provided.",
	aliases: [''],
	usage: '<> or <command> or `here` or `serv_id`(ADMIN RIGHT NEEDED)',
	cooldown: 5,
  execute(message, args) {
    const data = [];
	const { commands } = message.client;

	valarglis=["here"]
	args2=[]
	valarg=[]

	for (i in args) {
		for (u in valarglis) {
			if (args[i] != valarglis[u]) {
				args2.push(args[i])	
			} else {
				valarg.push(args[i])
			}
		}
	}
	args = args2

	if (!args.length) {
		
	data.push('Here\'s a list of all my commands:');
	data.push(commands.map(command => `**${command.name}**`).join(' , '));
	data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
	data.push(`\n\nThis bot was coded by <@331778741917319168> and <@145525624939741184> with the support of France Alliance community !`);

	
		if (valarg.includes(valarglis[0])){
			message.channel.send(data, { split: true })
		} else {
			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}
	} else {
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		} else {

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
		message.channel.send(data, { split: true });

		}
	}
},
};
