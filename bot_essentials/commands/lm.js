const fs = require("fs");
const path = require("path");
module.exports = {
    name: "lm",
    description: "Display a liste of timestamp of last message by users",
    aliases: ["LM"],
    usage: "<>",
    cooldown: 1,
    execute(message, args) {
      if (message.mentions.users.size === 0) {
        message.channel.send(
            ` :arrow_right: data of ${message.guild} is ready !`,
            {
              files: [path.join(__dirname, `../../bot_essentials/compagnon_scripts/lm_data/${message.guild.id}.json`)],
            }
          );
      }
      if (message.mentions.users.size >= 1) {
        //message.channel.send(`His ID is ${message.mentions.users.map((user) => user.id)} `);
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, `../../bot_essentials/compagnon_scripts/lm_data/${message.guild.id}.json`)));
        
        for (i in args) {
            if (args[i].includes('<@!')) {
                ID=args[i].toString().replace('<@!', '').replace('>', '')
                message.channel.send(`${args[i]} send his last message @ **${data[ID]}**`);
            }
        }
      }
    },
  };
  
