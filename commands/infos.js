module.exports = {
	name: 'infos',
	description: 'Give informations about you and your context',
	execute(message) {
        message.channel.send(
            `Your username: ${message.author.username}\rChannel name: ${message.channel.name}\rServer name: ${message.guild.name} (with ${message.guild.memberCount} total members)`
          );
	},
};