const discord = require(`discord.js`);
const path = require("path");
const fs = require("fs");
const os = require("os");

const { token } = require(`../token.json`);

const client = new discord.Client();

ts = Date.now();

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

console.log("Start script");
var data = '';

client.on("message", async (message) => {
    console.log("");
    console.log("------");
    console.log("");

    m_guild = message.guild;
    m_author = message.author.toString().replace('<@', '').replace('>', '');
    m_date = new Date(message.createdTimestamp).toISOString();
    //console.log(m_guild.name+" ("+m_guild.id+")")
    console.log(message.author.username +"#"+ message.author.discriminator +" ("+ message.author.id+")")
    console.log(`@ ${m_date}`)
  
    /*
    fs.open(`./${m_guild.id}.json`, "w", function (err) {
        if (err) {
            console.log(err);
        }
    });

    await sleep(500);
    */

    if(fs.existsSync(`./lm_data/${m_guild.id}.json`)) {
        //console.log(`${m_guild.id}.json exist`);
    } else {
        console.log(`${m_guild.id} don't exist`);
        fs.writeFile(`./lm_data/${m_guild.id}.json`,'{}', function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          });

    }

    await sleep(500)

    const data = JSON.parse(fs.readFileSync(`./lm_data/${m_guild.id}.json`));
    data[m_author] = `${m_date}`;
    fs.writeFileSync(`./lm_data/${m_guild.id}.json`, JSON.stringify(data, null, 4));

    /*
    databases = JSON.parse(content);
  
    try {
      databases.push({
          m_author: `${m_date}`,
      });
      fs.writeFile(`./${m_guild.id}.json`, JSON.stringify(databases, null, 4), (err) => {
          if (err) {
              console.log(`Error writing file: ${err}`);
          }
      });
      console.log(
        m_author.username +
          "#" +
          m_author.discriminator +
          " (" +
          m_author.id +
          ") : " +
          m_guild.name +
          " (" +
          m_guild.id +
          ") @ " +
          m_date
      );
    } catch {
      console.log(message);
    }
    */

        /*
        else if (data == "") {
            console.log("empty")

            // add a new record
            m_data = {m_author: `${m_date}`}

            // write new data back to the file
            fs.writeFile(`./${m_guild.id}.json`, JSON.stringify(m_data, null, 4), (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            }); 
        }else {
            console.log("not empty")

            // add a new record
            data.m_author = m_date
            console.log("databases: "+databases)

            // write new data back to the file
            
            fs.writeFile(`./${m_guild.id}.json`, JSON.stringify(databases, null, 4), (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            });
        }
        */
});
client.login(token);

/*
fs.open('<fileName>',w,  function (err, file) {
    if (!err){
        console.log('File is opened in write mode.');
    } else {
        console.log('File is created and is now opened in write mode.');
    }
});
*/

/*
client.users.fetch(message.author.id).then(a =>
    //console.log(a.username + " :  " + a.lastMessageID)
    console.log(a)
)
*/

/*
a = Array.from(message.guild.members.cache);
for (i in a) {
    u = a[i][0];
    //console.log(a[i][0])
    client.users.fetch(u).then((b) => {
    u_ID = b.id;
    u_MID = b.lastMessageID
    message.channel.messages
        .fetch(u_MID)
        .then((message) => {
            console.log
            if (message.createdTimestamp){
            console.log(new Date(message.createdTimestamp))
            }
        })
        .catch(console.error);
    //console.log(u_ID + " :  " + u_MID);
    content.u_ID = u_MID;
    });
}
*/
