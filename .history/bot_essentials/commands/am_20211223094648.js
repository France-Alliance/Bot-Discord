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
                i[1].messages.fetch({ limit: 100 }).then(messages => {
                  console.log(messages)
                  for (j in messages){
                    console.log(j)
                  }
                    
                    //Iterate through the messages here with the variable "messages".
                    /*messages.forEach(message => 
                      //console.log(Object.getOwnPropertyNames(message)),
                        //console.log(message.channel.name),
                        console.log(message.createdTimestamp),
                        console.log(message.author.id),
                        console.log()
                        //console.log(`Received ${messages.size} messages`)
                        //console.log(`${message.author.username}: ${message.createdAt}: ${message.cleanContent}: ${message.channel.name}`)           
                        
                        )*/
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
