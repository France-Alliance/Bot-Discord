const discord = require(`discord.js`);
const chalk = require("chalk");

const launch = require(`./Function/Startup`);
const update = require(`./Functions/Update`);
const flux = require(`./Function/Userflux`);
const time = require(`./Function/Time`);

const {token} = require(`./token.json`);
const {prefix, state} = require(`./config.json`);

const client = new discord.Client();

//------------

launch.art()
update.update();

//------------

client.on("ready", () => {
  const clichannelsize = client.channels.cache.size
  const cliusersize = client.users.cache.size
  const cliguildsize = client.guilds.cache.size
  const cliuser = client.user
  launch.activity(cliuser, cliguildsize, prefix, state)
  launch.info(time.hours(), time.minutes(), time.secondes(), cliguildsize, cliusersize, clichannelsize)
});

//Say hello to every new user
flux.entry(client)
//Say hello to every new user
flux.exit(client)


//commands code
client.on("message", async (message) => {
  //If there's a command, the statement will turn to true. If there's no command, it will be false
  cmd = false
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
  const command = args.shift().toLowerCase();

  console.log(
    chalk.green(
      `--------------------------------------------------------------------------------------------------`
    )
  );

  if (command === "help") {
    var nameDev = [];
    message.guild.members.cache.map((obj) => {
      if (obj.id === "331778741917319168" || obj.id === "145525624939741184") {
        nameDev.push(obj.user);
      }
    });
    console.log(nameDev);

    const help = new discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`Command available`)
      .setAuthor(`Control Tower`)
      .setDescription(`This a list of all the command available now`)
      .setThumbnail(`https://i.imgur.com/Vjx3EOm.jpg`)
      .addField(`\u200b`, `\`${prefix}infos\`\rShow info about you`, false)
      .addField(`\u200b`, `\`${prefix}say\`\rSay what you want`, false)
      .addField(`\u200b`, `\`${prefix}ping\`\rShow the ping`, false)
      .addField(`\u200b`, `\`${prefix}token\`\rShow the token`, false)
      .addField(`\u200b`, `\`${prefix}serveur_infos\`\rShow the ping`, false)
      .addField(`\u200b`, `\`${prefix}id (optional tag)\`\rShows ID of you choice`, false)
      .addField(`\u200b`, `\`${prefix}master\`\rThis one is secret but powerful...`, false)
      .addField(`\u200b`, `\u200b`, false)
      .addField(
        `And now, a message from our sponsor:`,
        `-----------------------------------\rYou should join us to play Airline Manager 2 !\r We accept everyone, with every level !! (discord.gg/ZGWHpfm) !\r----------------\rYou have question or problem with the bot ?\r Send a message on this server: (discord.gg/HaTSNyA)\r----------------\rThis bot has been built by ${nameDev[0]}\rand with the M-A-S-S-I-V-E help of ${nameDev[1]} !\r-----------------------------------`,
        false
      )
      .setTimestamp()
      .setFooter(`Have a good day !`);

    message.channel.send(help);
    cmd = true
  }

  if (command === "infos") {
    message.channel.send(
      `Your username: ${message.author.username}\rChannel name: ${message.channel.name}\rServer name: ${message.guild.name} (with ${message.guild.memberCount} total members)`
    );
    cmd = true
  }

  if (command === "say") {
    // makes the bot say something and delete the message. As an example, it`s open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch((O_o) => { });
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
    cmd = true
  }

  if (command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Pong!");
    m.channel.send(
      `For real, latency is ${m.createdTimestamp - message.createdTimestamp}ms`
    );
    cmd = true
  }

  if (command === "token") {
    message.channel.send(
      `Really ${message.author.username} ?! Did you actually think i would put my token in a command?`
    );
    cmd = true
  }

  if (command === "serveur_infos") {
    // unix timestamp
    var ts = message.guild.createdTimestamp;

    // initialize new Date object
    var date_ob = new Date(ts);

    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear();

    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2);

    // hours as 2 digits (hh)
    var hours = ("0" + date_ob.getHours()).slice(-2);

    // minutes as 2 digits (mm)
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // seconds as 2 digits (ss)
    var seconds = ("0" + date_ob.getSeconds()).slice(-2);

    var dte =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    console.log(
      "Date as YYYY-MM-DD hh:mm:ss Format: " +
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
    console.log(message.guild.owner);

    message.channel.send(
      ` ${message.guild.name}: ${message.guild.memberCount
      } total members\rServer Region: ${message.guild.region}\rOwner: ${message.guild.owner
      }\rCreated: ${dte}\rServer Icon: ${message.guild.iconURL(
        "jpg",
        true,
        2048
      )}`
    );
    cmd = true
  }

  if (command === "id") {
    var userm = message.mentions;

    if (userm.users.size === 0) {
      message.channel.send(`Your ID is ${message.author.id} `);
    }
    if (userm.users.size != 0) {
      message.channel.send(`His ID is ${userm.users.map((user) => user.id)} `);
    }
    cmd = true
  }

  if (command === "master") {
    console.log("IS THIS A MASTER ?");
    console.log("        ||        ");

    if (
      message.author.id === "331778741917319168" ||
      message.author.id === "145525624939741184"
    ) {
      console.log("HE IS A MASTER !");
      message.channel.send("What can I do for you, Master ?");
    } else {
      console.log("HE`S NOT A MASTER! BURN HIM!");
      message.channel.send("Sorry your not a dev (CHEH)");
    }
    cmd = true
  }

  if (command === "channel_infos") {
    var timestampCreate = [];
    var argsc = message.content.split(" ");
    var date = argsc[1];
    date = date.split("/");
    var ndate = date[1] + "/" + date[0] + "/" + date[2];
    var tdate = new Date(ndate).getTime();
    var nndate = new Date().getTime();
    var gdate = [];
    var i = 0;

    message.guild.channels.cache.map((obj) => {
      timestampCreate.push(obj.createdTimestamp);
    });

    timestampCreate.forEach((ttc) => {
      if (ttc > tdate && ttc < nndate) {
        gdate.push(ttc);
      }
    });

    message.channel.send(
      `Channel & Category created since ${ndate} : ${gdate.length}`
    );
    cmd = true
  }

  if (command === "test") {
    console.log("Empty")
    message.channel.send(`Déso fréro, y'a r ici mais tkt, t'est le sang !`);
    cmd = true
  }

  if (cmd === false ) {
    console.log(`no command "${command}"`)
    message.channel.send(`Sorry but there's no command "${command}"... Try \`\`\`${prefix}help\`\`\` to have a list of available commands `)
  }
});


client.login(token);
