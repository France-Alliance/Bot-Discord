  
module.exports = {
	name: 'id',
	description: 'Ping!',
	execute(message) {
		if (message.mentions.users.size === 0) {
            message.channel.send(`Your ID is ${message.author.id} `);
          }
          if (message.mentions.users.size != 0) {
            message.channel.send(`His ID is ${userm.users.map((user) => user.id)} `);
          }
	},
};



