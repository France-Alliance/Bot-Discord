module.exports = {
  name: "master",
  description: "This one is secret but yet powerful...",
  aliases: [''],
	usage: '<>',
	cooldown: 5,
  execute(message) {
    if (
      message.author.id === "331778741917319168" ||
      message.author.id === "145525624939741184"
    ) {
      message.channel.send("What can I do for you, Master ?");
    } else {
      message.channel.send("Sorry your not a dev (CHEH)");
    }
  },
};
