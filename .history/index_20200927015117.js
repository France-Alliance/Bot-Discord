//There's code from: "https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3"

const discord = require(`discord.js`);
const ytdl = require(`ytdl-core`);
const sqlite = require(`sqlite3`);
const { prefix, state } = require(`./config.json`);
const { token } = require(`./token.json`);
const client = new discord.Client();
const fs = require(`fs`);

const Anniv = require(`./Function/Anniversaire`);
const meet = require(`./Function/Meet`);

const newUsers = [];
const Meet = []; // Strutures = SMeet, OMeet, FMeet
const queue = {};
const array = [
  "https://www.youtube.com/watch?v=lTRiuFIWV54",
  "https://www.youtube.com/watch?v=wAPCSnAhhC8",
  "https://www.youtube.com/watch?v=rA56B4JyTgI",
];
var timeHServer = new Date().getHours();
var timeMServer = new Date().getMinutes();
var timeSServer = new Date().getSeconds();

const Cbdd = false;

var serveur = {};

function play(connection, message) {
  var server = servers[message.guild.id];
  serveur.dispatcher = connection.play(
    ytdl(serveur.queue[0], { filter: `audioonly` })
  );
  serveur.queue.shift();
  server.dispatcher.on("end", function () {
    if (serveur.queue[0]) play(connection, message);
    //If there's a music in the queue, play it
    else connection.disconnect; // If not, leave
  });
}

console.log(`
  _____               _                _         _______                         
 / ____|             | |              | |       |__   __|                        
| |      ___   _ __  | |_  _ __  ___  | |  ___     | |  ___ __      __ ___  _ __ 
| |     / _ \\ | '_ \\ | __|| '__|/ _ \\ | | / _ \\    | | / _ \\\\ \\ /\\ / // _ \\| '__|
| |____| (_) || | | || |_ | |  | (_) || ||  __/    | || (_) |\\ V  V /|  __/| |   
 \\_____|\\___/ |_| |_| \\__||_|   \\___/ |_| \\___|    |_| \\___/  \\_/\\_/  \\___||_| 
______________________________________________________________________________________________
`);

if (fs.existsSync(`./Bot.db3`)) {
  var db = new sqlite.Database(`Bot.db3`, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }

    console.log(`Connected to the Database`);
  });
} else {
  var db = new sqlite.Database(`Bot.db3`, (err) => {
    if (err) {
      console.error(err.message);
    }

    db.run(`CREATE TABLE anniversaire (
                        PlayerID text,
                        Date text
                )`);

    db.run(`CREATE TABLE meet (
                    owner text,
                    Name text,
                    HeureStart text,
                    HeureEnd text
            )`);
    console.log(`Connected and Create to the Database`);
  });
}

client.on("ready", () => {
  console.log(
    `----------------------------------------------------------------------------------------------`
  );
  console.log(
    `Bot is ready.\nHe has started at ${timeHServer}:${timeMServer}:${timeSServer}\n\nHe has started in ${client.guilds.cache.size} guilds, with ${client.users.cache.size} users in ${client.channels.cache.size} channels`
  );
  client.user.setActivity(`Discord | ${prefix} help | ${state}`, {
    type: "WATCHING",
  });
  console.log(
    `----------------------------------------------------------------------------------------------`
  );
});

//Say hello to every new user
client.on("guildMemberAdd", (member) => {
  console.log(`guildMemberAdd: ON`);
  const guild = member.guild;
  if (!newUsers[guild.id]) {
    console.log(`!newUsers[guild.id]: ON`);
    newUsers[guild.id] = new discord.Collection();
    newUsers[guild.id].set(member.id, member.user);
  }

  if (newUsers[guild.id].size > 0) {
    const userlist = newUsers[guild.id].map((u) => u.toString()).join(" ");
    console.log(`Welcome message will be send`);
    client.channels.cache
      .find((channel) => channel.name === "entry")
      .send(
        `Welcome our new users ! [${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}]\r` +
        userlist
      );
    console.log(`Welcome message was sent`);
    newUsers[guild.id].clear();
  }
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  if (newUsers[guild.id] == (member.id)) newUsers.delete(member.id);
  console.log(`Goodbye message will be send`);
  client.channels.cache
    .find((channel) => channel.name === "exit")
    .send(
      `At we have lost ${member}... [${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}]`
    );
  console.log(`Goodbye message was sent`);
});

//commands code
client.on("message", async (message) => {
  // This event will run on every single message received, from any channel or DM.

  // It`s good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "!!say Is this the real life?" , we`ll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

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
      .addField(`\u200b`, "`!!infos`\rShow info about you", false)
      .addField(`\u200b`, "`!!say`\rSay what you want", false)
      .addField(`\u200b`, "`!!ping`\rShow the ping", false)
      .addField(`\u200b`, "`!!token`\rShow the token", false)
      .addField(`\u200b`, "`!!serveur_infos`\rShow the ping", false)
      .addField(
        `\u200b`,
        "`!!id (optional tag)`\rShows ID of you choice",
        false
      )
      .addField(
        `\u200b`,
        "`!!master`\r this one is secret but powerful...",
        false
      )
      .addField(
        `\u200b`,
        "`!!nbrchannel (DD/MM/YY)`\rShow the number of channel and category created since the date in the server",
        false
      )
      .addField(`\u200b`, `\u200b`, false)
      .addField(
        `And now, a message from our sponsor:`,
        `-----------------------------------\rYou should join us to play Airline Manager 2 !\r We accept everyone, with every level !! (discord.gg/ZGWHpfm) !\r----------------\rYou have question or problem with the bot ?\r Send a message on this server: (discord.gg/HaTSNyA)\r----------------\rThis bot has been built by ${nameDev[0]}\rand with the M-A-S-S-I-V-E help of ${nameDev[1]} !\r-----------------------------------`,
        false
      )
      .setTimestamp()
      .setFooter(`Have a good day !`);

    message.channel.send(help);
    console.log(`----------------------------------------`);
  }
  //if !info, answer with the username, the guild name and the number of user in the guild
  if (command === "infos") {
    message.channel.send(
      `Your username: ${message.author.username}\rChannel name: ${message.channel.name}\rServer name: ${message.guild.name} (with ${message.guild.memberCount} total members in ${client.guilds.cache.size} servers)`
    );
    console.log(`----------------------------------------`);
  }

  if (command === "say") {
    // makes the bot say something and delete the message. As an example, it`s open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch((O_o) => { });
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
    console.log(`----------------------------------------`);
  }

  if (command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Pong!");
    m.channel.send(
      `For real, latency is ${m.createdTimestamp - message.createdTimestamp}ms`
    );
    console.log(`----------------------------------------`);
  }

  if (command === "token") {
    message.channel.send(
      `Really ${message.author.username} ?! Did you actually think i would put my token in a command?`
    );
    console.log(`----------------------------------------`);
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
    console.log(`----------------------------------------`);
  }

  if (command === "id") {
    var userm = message.mentions;

    if (userm.users.size === 0) {
      message.channel.send(`Your ID is ${message.author.id} `);
    }
    if (userm.users.size != 0) {
      message.channel.send(`His ID is ${userm.users.map((user) => user.id)} `);
    }
    console.log(`----------------------------------------`);
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
    console.log(`----------------------------------------`);
  }

  if (command === "audio") {
    var argsc = message.content.split(" ");
    if (message.member.voice.channel) {
      if (argsc[2] != "") {
        message.reply(`I'm coming!`);
        console.log("audio is coming");
      }

      const connection = await message.member.voice.channel.join();
      if (argsc[1] === "music") {
        console.log("audio is now playing");
        const dispatcher = connection.play(
          ytdl(array, { filter: `audioonly` })
        ); //music is { 1 A.M Study Session 📚 - [lofi hip hop/chill beats] }
        console.log(array);
      }
      if (argsc[2] === "resume") {
        dispatcher.resume("resume", () => {
          console.log("audios now resume");
        });
      }
      if (argsc[2] === "pause") {
        dispatcher.pause("pause", () => {
          console.log("audio is now paused");
        });
      }
      if (argsc[2] === "stop") {
        console.log("audio is now stopped");
        dispatcher.destroy();
      }
    } else {
      message.reply(`you need to join a voice channel first!`);
    }
    console.log(`----------------------------------------`);
  }

  if (command === "play") {
    var arg = message.content.split(" ");

    if (!arg[1]) {
      message.reply(`I need a link to play music...`);
    }

    if (message.member.voice.channel) {
      message.reply(`I'm coming!`);
      console.log("audio is coming");
      message.member.voice.channel.join();
    } else {
      message.reply(`You need to be in a voice channel !`);
      console.log("audio isn't coming");
    }

    if (!servers[message.guild.id])
      serveurs[message.guild.id] = {
        queue: [],
      };

    var serveur = servers[message.guild.id];

    if (!message.member.voice.channel)
      message.member.voice.channel.join().then(function (connection) {
        play(connection, message);
      });

    console.log(`----------------------------------------`);
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
    console.log(`----------------------------------------`);
  }

  if (command === "meet") {
    var argsc = message.content.split(" ");
    var timeHServer = new Date().getHours();
    var timeMServer = new Date().getMinutes();
    var timeSServer = new Date().getSeconds();
    message.channel.send(
      `Heure du serveur : ${timeHServer}:${timeMServer}:${timeSServer}`
    );

    if (argsc[1] === "start") {
      var SMeet = new Date().getTime();
      var SMeetD = new Date().getHours();

      Meet.push([SMeet, argsc[2], null]);

      message.channel.send(
        `Vous commencez une réunion nommée ${argsc[2]} à ${SMeetD}h, bon bah bonne réunion ;)`
      );
    }

    if (argsc[1] === "list") {
      if (Meet.length != 0) {
        message.channel.send(`Il y a ${Meet.length} réunion en cours`);
      } else {
        message.channel.send(`Auncune réunion est enregistré`);
      }
    }

    if (argsc[1] === "search") {
      if (Meet.length != 0) {
        for (let index = 0; index < Meet.length; index++) {
          const meet = Meet[index];
          var SMeet = null;
          SMeet = meet.indexOf(argsc[2]);

          console.log(SMeet);
          if (SMeet != null) {
            var SMeetH = new Date(meet[0]).getHours();
            var SMeetM = new Date(meet[0]).getMinutes();
            var SMeetS = new Date(meet[0]).getSeconds();

            message.channel.send(
              `Il ya bien une réunion au nom de ${argsc[2]} qui à commencé à ${SMeetH}:${SMeetM}:${SMeetS}`
            );
          }
        }
      } else {
        message.channel.send(`Auncune réunion à ce nom : ${argsc[2]}`);
      }
    }

    if (argsc[1] === "end") {
      var FMeet = new Date().getTime();
      var FMeetD = new Date().getHours();

      if (Meet.length != 0) {
        for (let index = 0; index < Meet.length; index++) {
          const meet = Meet[index];

          if (meet[1] === argsc[2]) {
            var duree = FMeet - meet[0];
            duree = new Date(duree).getMinutes();
            message.channel.send(
              `Vous finissez votre réunion nommée ${argsc[2]} de ${duree}min à cette heure-là ${FMeetD}h !`
            );
            Meet.splice(index, 1);
          }

          if (meet[1] != argsc[2]) {
            message.channel.send(`Auncune réunion à ce nom : ${argsc[2]}`);
          }
        }
      } else {
        message.channel.send(`Auncune réunion est enregistré`);
      }
    }
  }

  let commandUsed = Anniv.parse(message, prefix, db); // || meet.parse(message, prefix, db);
});

client.login(token);
