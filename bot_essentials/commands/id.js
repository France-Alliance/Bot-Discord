module.exports = {
  name: "id",
  description: "Display the ID of the user taged, you by default",
  aliases: [""],
  usage: "<> or <@user>",
  cooldown: 1,
  execute(message, args) {
    if (message.mentions.users.size === 0) {
      message.channel.send(`Your ID is ${message.author.id} `);
    }
    if (message.mentions.users.size != 0) {
      message.channel.send(`His ID is ${message.mentions.users.map((user) => user.id)} `);
    }
  },
};
