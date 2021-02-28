const discord = require('discord.js');
const {prefix} = require(`../config.json`);
module.exports = {
  name: "help",
  description: "Information about the arguments provided.",
  execute(message) {
    var nameDev = [];
    message.guild.members.cache.map((obj) => {
      if (obj.id === "331778741917319168" || obj.id === "145525624939741184") {
        nameDev.push(obj.user);
      }
    });
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
      .addField(`\u200b`, `\`${prefix}server_infos\`\rShow the ping`, false)
      .addField(
        `\u200b`,
        `\`${prefix}id (optional tag)\`\rShows ID of your choice`,
        false
      )
      .addField(
        `\u200b`,
        `\`${prefix}master\`\rThis one is secret but yet powerful...`,
        false
      )
      .addField(
        `\u200b`,
        `\`${prefix}am2d\`\rSummmon a file with all France Alliance AM2 Data (take ≈ 10mn)`,
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
  },
};
