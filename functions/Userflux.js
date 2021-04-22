const chalk = require("chalk");

function entry(client){
  client.on("guildMemberAdd", (member) => {
    console.log(
      chalk.green(
        `--------------------------------------------------------------------------------------------------`
      )
    );
      member.guild.channels.cache
        .find((channel) => channel.name === "➡-entry")
        .send(
          `Welcome to ${member}| ${member.user.username} #${member.user.discriminator}... @ [${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}]`
        );
        console.log(`Welcome message was sent to ${member.user.username} #${member.user.discriminator}`);
    });
}

function exit(client){
  client.on("guildMemberRemove", (member) => {
    console.log(
      chalk.green(
        `--------------------------------------------------------------------------------------------------`
      )
    );
      member.guild.channels.cache
        .find((channel) => channel.name === "⬅-exit")
        .send(
          `We have lost ${member} | ${member.user.username} #${member.user.discriminator}... @ [${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}]`
        );
      console.log(`Goodbye message was sent to ${member.user.username} #${member.user.discriminator}`);
    });
}


module.exports = { entry, exit };