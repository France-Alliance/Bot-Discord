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
        console.log(i)
        console.log(i[1].messages)
        for (j in c){
            if (i.type == "GUILD_TEXT"){
                //console.log(c[j][1].name)
                for ([key,value] of c[j][1].messages.cache) {
                        //console.log(key.content)
                    
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
