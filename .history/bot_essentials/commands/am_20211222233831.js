//Fetch all messages

module.exports = {
  name: "am",
  description: "Display the ID of the user taged, you by default",
  aliases: [""],
  usage: "<>",
  cooldown: 1,
  execute(message, args) {
      c=[]
      for (i of message.guild.channels.cache){
        c.push(i)
        for (j in c){
            if (c[j][1].type == "GUILD_TEXT"){
                for (key of c[j][1].messages.cache) {
                    console.log(key[1].content)
                  }
            }
        }

      }
    /*message.guild.channels.cache.forEach((channel) => {
      channel.messages.fetch().then((messages) => {
        messages.forEach((msg) => console.log(msg.content));
      });
    });*/
  }
};
