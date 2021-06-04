const discord = require(`discord.js`);
const path = require("path");
const fs = require("fs");
const os = require('os')

const { token } = require(`../token.json`);
const client = new discord.Client();

client.on("message", async (message) => {
    /*fs.open('<fileName>',w,  function (err, file) {
        if (!err){ 
            console.log('File is opened in write mode.');
        } else {
            console.log('File is created and is now opened in write mode.');
        }
      });*/
    
      console.log(client.users.fetch('697747694017314817'));
      
      
});
client.login(token);
