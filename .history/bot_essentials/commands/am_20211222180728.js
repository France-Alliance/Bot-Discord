//Fetch all messages
message.guild.channels.cache.forEach(channel => {
    channel.messages.fetch().then(messages => {
      messages.forEach(msg => console.log(msg.content));
    });
  });