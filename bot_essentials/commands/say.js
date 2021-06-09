module.exports = {
  name: "say",
  description: "Say what you want",
  aliases: ['tell'],
	usage: '<Your sentence>',
	cooldown: 5,
  execute(message, args) {
    const sayMessage = "" + args.join(" ");
    message.delete().catch((O_o) => {});
    message.channel.send(sayMessage);
  },
};
