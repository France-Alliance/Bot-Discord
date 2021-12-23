//Fetch all messages

module.exports = {
  name: "am",
  description: "Display the ID of the user taged, you by default",
  aliases: [""],
  usage: "<>",
  cooldown: 1,
  execute(message, args) {
      for (i of message.guild.channels.cache){
            if (i[1].type == "GUILD_TEXT"){
                //console.log(i[1].name)
                //.log(i[1].messages.cache)
                i[1].messages.fetch({ limit: 5 }).then(messages => {
                    
                    //Iterate through the messages here with the variable "messages".
                    messages.forEach(message => 
                        console.log(message.channel.name)
                        console.log(`Received ${messages.size} messages`)
                        //console.log(`${message.author.username}: ${message.createdAt}: ${message.cleanContent}: ${message.channel.name}`)
null
                        
                        
                        )
                  })
                  
            }
    

      }
    /*message.guild.channels.cache.forEach((channel) => {
      channel.messages.fetch().then((messages) => {
        messages.forEach((msg) => console.log(msg.content));
      });
    });*/
  }
};
