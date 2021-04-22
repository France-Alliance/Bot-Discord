async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function tok(message) {
  message.delete().catch((O_o) => {});
  message.channel.send(
    "Nd9nKkHEEjDMod1ICaDodiTPdx7FMHX8uRaLiEIHL6V5epRXBuYO59Z7ad2t"
  ).then(msg => {
    setTimeout(() => msg.delete().catch((O_o) => {}), 1000)
  })
  await sleep(1500);
  message.channel.send(
    `Oupsi, you have seen nothing...`
  ).then(msg => {
    setTimeout(() => msg.delete().catch((O_o) => {}), 1500)
  });
  await sleep(8000);
  message.channel.send(
    `Really ${message.author.username} ?! Did you actually think I would put my token in a command?\rIt's a fake one...`
  );
}

module.exports = {
  name: "token",
  description: "Did I really did this mistake ? You are about to find out...",
  aliases: ['joke'],
	usage: '<>',
	cooldown: 5,
  execute(message, args) {
    tok(message);
  },
};