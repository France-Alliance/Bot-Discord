async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function tok(message) {
  message.channel.send(
    "Nd9nKkHEEjDMod1ICaDodiTPdx7FMHX8uRaLiEIHL6V5epRXBuYO59Z7ad2t"
  );
  await sleep(2500);
  message.channel.send(
    `Really ${message.author.username} ?! Did you actually think I would put my token in a command?\rIt's a fake one...`
  );
}

module.exports = {
  name: "token",
  description: "Did I really did this mistake ? You are about to find out...",
  execute(message, args) {
    tok(message);
  },
};
