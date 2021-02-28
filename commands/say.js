module.exports = {
  name: "say",
  description: "Say want you want him to say",
  execute(message, args) {
    const sayMessage = "" + args.join(" ");
    message.delete().catch((O_o) => {});
    message.channel.send(sayMessage);
  },
};
