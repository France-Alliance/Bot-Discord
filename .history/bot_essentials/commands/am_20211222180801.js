//Fetch all messages


module.exports = {
name: "id",
description: "Display the ID of the user taged, you by default",
aliases: [""],
usage: "<> or <@user>",
cooldown: 1,
execute(message, args) {
    message.guild.channels.cache.forEach(channel => {
        channel.messages.fetch().then(messages => {
          messages.forEach(msg => console.log(msg.content));
        });
      });
},
};
  