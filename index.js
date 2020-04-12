//There is code from:
//https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3

const Discord = require('discord.js');
const { prefix, state } = require('./config.json');
const { token } = require('./token.json');
const client = new Discord.Client();
const newUsers = [];
const Meet = []; // Strutures = SMeet, OMeet, FMeet
const Cbdd = false;

// DEBUT PARTIE BDD

const mysql = require('mysql');

var conn = mysql.createConnection({ host: "localhost", user: "Program", password: "HelloWords42", port: "27017" });

conn.connect((err) => {

    if (err != null || "" || undefined) {
        console.log("Not Connected", err);
    };

    if (err == null || "" || undefined) {
        console.log("Connected!");
    };

    conn.query("CREATE DATABASE Botdiscord", function(err) {
        console.log("Database created");
    });
});

// FIN PARTIE BDD

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
        message.channel.send(`the command <!info> give you:
Your username:{X}
Channel name:{X}
Server name:{X} (with {X} total members)

the command <!say [What you want]> give you:
[What you want]

the command <!ping> give you:
Pong!
For real, latency is {X}ms and API Latency is {X}ms

the command <!token> give you:
the token is {X}

the command <>

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
        message.channel.send(`Your username: ${message.author.username}\rChannel name: ${message.channel.name}\rServer name: ${message.guild.name} (with ${message.guild.memberCount} total members)
        \nThis bot has been built by @${message.author.username} and with the M A S S I V E help of @Fr_Space ☭.\rYou know AM2 ?! You'r looking for a group to play with, don't hesitate to join our Alliance : Discord.gg/ZGWHpfm !`);
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

        console.log(ts.toLocaleString());

        console.log("Date as YYYY-MM-DD hh:mm:ss Format: " + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

        console.log(ts)
        message.channel.send(` ${message.guild.name}: ${message.guild.memberCount} total members\rChannel Count: ${message.guild.channelsCount}\rServer Region: ${message.guild.region}\rOwner: ${message.guild.owner}\rCreated: ${dte}\rServer Icon: ${message.guild.iconURL("jpg", true, 2048)}`);
    };

    if (command === "token") {
        message.channel.send(`Really ${message.author.username} ?! Did you actually think i would put my token in a command?`);
    };

    if (command === "myID") {
        console.log("1st step");
        var user = msg.mentions.users.first();

        if (!user) {
            console.log("Your ID is...");
            message.channel.send(`Your ID is ${message.author.id} `);
        };
        if (user) {
            console.log("His ID is...");
            message.channel.send(`His ID is ${message.user.id} `);
        };
    }

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

        var tableauformat = message.guild.channels.cache.map((obj) => {
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
});

client.login(token);