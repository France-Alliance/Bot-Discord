module.exports = {
  name: "id",
  description: "Display the ID of the user taged, you by default",
  aliases: [""],
  usage: "<> or <@user#0000>",
  cooldown: 1,
  execute(message) {
    if (message.mentions.users.size === 0) {
      message.channel.send(`Your ID is ${message.author.id} `);
    }
    if (message.mentions.users.size != 0) {
      message.channel.send(`His ID is ${userm.users.map((user) => user.id)} `);
    }
  },
};
