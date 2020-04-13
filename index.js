//There is code from:
//https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3

const Discord = require('discord.js');
const { prefix, state } = require('./config.json');
const { token } = require('./token.json');
const client = new Discord.Client();
const newUsers = [];
const Meet = []; // Strutures = SMeet, OMeet, FMeet
const Cbdd = false;
const sqlite = require('sqlite3');
const fs = require('fs');

if (fs.existsSync('./Bot.db3')) {
    var db = new sqlite.Database('Bot.db3', sqlite.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        };

        console.log('Connected to the Database');
    })
} else {
    var db = new sqlite.Database('Bot.db3', (err) => {
        if (err) {
            console.error(err.message);
        };

        db.run(`CREATE TABLE anniversaire (
                        PlayerID text,
                        Date text
                )`);
        console.log('Connected and Create to the Database');
    });
};

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot is ready.\nHe has started in ${client.guilds.cache.size} guilds,  with ${client.users.cache.size} users in ${client.channels.cache.size} channels`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`${state} for ${client.guilds.cache.size} servers`);
});

//Say hello to every new user
client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    if (!newUsers[guild.id]) {
        newUsers[guild.id] = new Discord.Collection();
        newUsers[guild.id].set(member.id, member.user);
    };

    if (newUsers[guild.id] > 10) {
        const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
        guild.channels.find(channel => channel.name === "general").send("Welcome our new users!\n" + userlist);
        newUsers[guild.id].clear();
    };
});

//commands code
client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Let's go with a few common example commands! Feel free to delete or change those.

    if (command === "help") {
        message.channel.send(`the command <${prefix}info> give you:
Your username:{X}
Channel name:{X}
Server name:{X} (with {X} total members)

the command <${prefix}say [What you want]> give you:
[What you want]

the command <${prefix}ping> give you:
Pong!
For real, latency is {X}ms and API Latency is {X}ms

the command <${prefix}token> give you:
the token is {X}

the command <${prefix}serveur_infos> give you:
Dev Labs: {X}
Server Region: {X}
Owner: {X}
Created: {X}
Server Icon: {X}

the command <${prefix}myid> give you:

`);
    };

    if (command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Pong!");
        m.channel.send(`For real, latency is ${m.createdTimestamp - message.createdTimestamp}ms and API Latency is ${Math.round(client.ping)}ms`);
    };

    if (command === "say") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        // To get the "message" itself we join the `args` back into a string with spaces:
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o => {});
        // And we get the bot to say the thing:
        message.channel.send(sayMessage);
    };
    //if !info, answer with the username, the guild name and the number of user in the guild
    if (command === "info") {
        var nameDev = [];

        message.guild.members.cache.map((obj) => {
            if (obj.id === "331778741917319168" || obj.id === "145525624939741184") {
                nameDev.push(obj.user);
            }
        });

        console.log(nameDev);

        message.channel.send(`Your username: ${message.author.username}\rChannel name: ${message.channel.name}\rServer name: ${message.guild.name} (with ${message.guild.memberCount} total members)
        \nThis bot has been built by ${nameDev[0]} and with the M A S S I V E help of ${nameDev[1]}.\rYou know AM2 ?! You'r looking for a group to play with, don't hesitate to join our Alliance : Discord.gg/ZGWHpfm !`);
    };

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

        var dte = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

        console.log("Date as YYYY-MM-DD hh:mm:ss Format: " + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

        console.log(message.guild.owner)

        message.channel.send(` ${message.guild.name}: ${message.guild.memberCount} total members\rServer Region: ${message.guild.region}\rOwner: ${message.guild.owner}\rCreated: ${dte}\rServer Icon: ${message.guild.iconURL("jpg", true, 2048)}`);
    };

    if (command === "token") {
        message.channel.send(`Really ${message.author.username} ?! Did you actually think i would put my token in a command?`);
    };

    if (command === "myid") {
        var userm = message.mentions;

        if (userm.users.size === 0) {
            message.channel.send(`Your ID is ${message.author.id} `);
        };
        if (userm.users.size != 0) {
            message.channel.send(`His ID is ${userm.users.map(user => user.id)} `);
        };
    };

    if (command === "azerty") {
        console.log("HE IS MAYBE THE MASTER !");

        if (message.author.id === "331778741917319168" || message.author.id === "145525624939741184") {
            console.log("HE IS THE MASTER !");
            message.channel.send("What can I do for you, Master ?");
        } else {
            console.log();
            message.channel.send("Sorry your not a dev (CHEH)");
        };
    };

    if (command === "nbrchannel") {
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
            timestampCreate.push(obj.createdTimestamp)
        });

        timestampCreate.forEach(ttc => {
            if (ttc > tdate && ttc < nndate) {
                gdate.push(ttc);
            };
        });

        message.channel.send(`Channel & Category created since ${ndate} : ${gdate.length}`);
    };

    if (command === "meet") {
        var argsc = message.content.split(" ");
        var timeHServer = new Date().getHours();
        var timeMServer = new Date().getMinutes();
        var timeSServer = new Date().getSeconds();
        message.channel.send(`Heure du serveur : ${timeHServer}:${timeMServer}:${timeSServer}`);

        if (argsc[1] === "start") {
            var SMeet = new Date().getTime();
            var SMeetD = new Date().getHours();

            Meet.push([SMeet, argsc[2], null])

            message.channel.send(`Vous commencez une réunion nommée ${argsc[2]} à ${SMeetD}h, bon bah bonne réunion ;)`);
        };

        if (argsc[1] === "list") {

            if (Meet.length != 0) {
                message.channel.send(`Il y a ${Meet.length} réunion en cours`);
            } else {
                message.channel.send(`Auncune réunion est enregistré`);
            };

        };

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

                        message.channel.send(`Il ya bien une réunion au nom de ${argsc[2]} qui à commencé à ${SMeetH}:${SMeetM}:${SMeetS}`);
                    };
                };
            } else {
                message.channel.send(`Auncune réunion à ce nom : ${argsc[2]}`);
            };

        };

        if (argsc[1] === "end") {
            var FMeet = new Date().getTime();
            var FMeetD = new Date().getHours();

            if (Meet.length != 0) {
                for (let index = 0; index < Meet.length; index++) {
                    const meet = Meet[index];

                    if (meet[1] === argsc[2]) {
                        var duree = FMeet - meet[0]
                        duree = new Date(duree).getMinutes();
                        message.channel.send(`Vous finissez votre réunion nommée ${argsc[2]} de ${duree}min à cette heure-là ${FMeetD}h !`);
                        Meet.splice(index, 1);
                    };

                    if (meet[1] != argsc[2]) {
                        message.channel.send(`Auncune réunion à ce nom : ${argsc[2]}`);
                    };
                };
            } else {
                message.channel.send(`Auncune réunion est enregistré`);
            };

        };

    };

    if (command === 'anniversaire') {
        var argsc = message.content.split(" ");

        if (argsc[1] === 'add') {
            var author = message.mentions.users;
            var date = String(argsc[2]);

            db.serialize

            db.run(`INSERT into anniversaire (PlayerID, Date) VALUES (${author.map((obj) => { return obj.id; })}, ${date})`, (err) => {
                if (err) {
                    console.error(err.message);
                };

                console.log('Add DB Values');
            });
            message.channel.send(`l'Anniversaire de ${author.map((obj) => { return obj.username; })} a été enregistré (${date})`)
        };

        if (argsc[1] === 'list') {
            let sql = `SELECT * FROM anniversaire`

            db.all(sql, [], (err, rows) => {
                if (err) {
                    throw err;
                };

                var player = [];

                rows.forEach((row) => {
                    console.log(row);
                    message.guild.members.cache.forEach((iddb) => {
                        if (row.PlayerID === iddb.id) {
                            player.push([iddb.user, row.Date]);
                        };
                    });
                });

                message.channel.send('Voici la liste des personne ayant enregistré leurs anniversaire :');
                player.forEach((name) => {
                    message.channel.send(` - ${name[0]} (${name[1]})`);
                })
            });
        };

        if (argsc[1] === 'search') {};

        if (argsc[1] === 'remove') {};

    };
});

client.login(token);
