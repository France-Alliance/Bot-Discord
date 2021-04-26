module.exports = {
	name: 'introduce',
	description: 'Introduce people into an alliance and send a welcome message !',
	aliases: ['intro'],
	usage: '<nb of role to remove> <nb of role to add> <nb of role to send a message> <roles to remove> <roles to add> <channel to send message> <Message to send>',
	cooldown: 0,
	execute(message, args) {
        
        
        
        
        
        
        message.channel.send(
            `Your username: ${message.author.username}\rChannel name: ${message.channel.name}\rServer name: ${message.guild.name} (with ${message.guild.memberCount} total members)`
          );
	},
};