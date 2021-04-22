const discord = require(`discord.js`);
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

const functions = require(`./functions_manager`);

const { token } = require(`./token.json`);
const { prefix, state } = require(`./config.json`);

const client = new discord.Client();
client.commands = new discord.Collection();
client.cooldowns = new discord.Collection();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "./", `commands`))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const launch = functions.launch;
const update = functions.update;
const flux = functions.flux;
const time = functions.time;

//------------

launch.art();
update.update_bot();
update.data_feed(client);

//------------

client.on("ready", () => {
  launch.activity(client, state, prefix);
  launch.info(client, time);
  console.log("\r\r");
});

//Say hello to every new user
flux.entry(client);
//Say hello to every new user
flux.exit(client);

//commands code
client.on("message", async (message) => {
  // This event will run on every single message received, from any channel or DM.
  // Ignore other bots. This also makes your bot ignore itself and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Good practice to ignore any message that does not start with our prefix,
  if (message.content.indexOf(prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "!!say Is this the real life?" , we`ll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  console.log(
    chalk.green(
      `--------------------------------------------------------------------------------------------------`
    )
  );

  if (!command) {
    message.reply(
      `sorry but there's no command "${commandName}"... Try \`\`\`${prefix}help\`\`\` to have a list of available commands`
    );
    console.log(
      `${message.author.username}#${message.author.discriminator} (${message.author}) tried non-existing command "${commandName}"`
    );
    return;
  }

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 5) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


  try {
    command.execute(message, args);
    console.log(
      `${message.author.username}#${message.author.discriminator} (${message.author}) succesfully used command "${commandName}"`
    );
  } catch (error) {
    console.log(
      `There was an error trying to execute that command!\r${message.author.username}#${message.author.discriminator} (${message.author}) unsuccesfully used command "${commandName}"`
    );
    console.error(error);
  }

  if (commandName === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    // Multiply by 2 to have an approximation of the round-trip latency
    const m = await message.channel.send("Pong!");
    m.channel.send(
      `For real, latency is ${m.createdTimestamp - message.createdTimestamp}ms`
    );
  }
});
client.login(token);
