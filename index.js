//There is code from:
//https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3

const Discord = require('discord.js');
const { prefix, token, state } = require('./config.json');
const client = new Discord.Client();
const newUsers = [];

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

client.on("guildMemberRemove", (member) => {
    const guild = member.guild;
    if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
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
        message.channel.send(`Your username: ${message.author.username}\nServer name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nChannel name: ${message.channel.name}`);
    };

    if (command === "nbrchannel") {
        var timestampCreate = [];
        var argsc = message.content.split(" ");
        var date = argsc[1];
        date = date.split("/");
        var ndate = date[1] + "/" + date[0] + "/" + date[2];
        var tdate = new Date(ndate).getTime();
        //var nndate = new Date().getTime();
        var gdate = [];
        var i = 0;

        message.channel.send(`Channel & Category created : ${message.guild.channels.cache.size}`);

        var tableauformat = message.guild.channels.cache.map((obj) => {
            timestampCreate.push(obj.createdTimestamp)
        });

        while (i <= timestampCreate) {
            if (timestampCreate[i] >= tdate) {
                gdate.push(timestampCreate[i]);
            }
        };

        console.log(timestampCreate, nndate, ndate, tdate, gdate, argsc);
    };
});

client.login(token);
