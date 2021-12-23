const date = require(`./Time`);
const cron = require("node-cron");
const chalk = require("chalk");
const fs = require('fs');

async function dtfd(client) {
  cron.schedule("30 06 * * *", () => {
    console.log(
      chalk.green(
        `--------------------------------------------------------------------------------------------------`
      )
    );
    //client.channels.cache.get(`719108278461923369`).send();
    client.channels.cache
      .get(`802199511102783509`)
      .send(`📚 | D A T A   I N C O M I N G\r------------------------------\r\rHello! Here is the data from ${date.date()}-${date.month()}-${date.year()}`);
    client.channels.cache
      .get(`802199511102783509`)
      .send({files: [`../../bot_essentials/scrapper/data/${date.date()}-${date.month()}-${date.year()}.json`] });
    console.log(`The command "am2d" was automatically & succesfully used `);
  });
  
  fs.readFile(`../../bot_essentials/scrapper/data/${date.date()}-${date.month()}-${date.year()}.json`, 'utf8', (err, data) => {
  
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {

        // parse JSON string to JSON object
        const databases = JSON.parse(data);
        a=''
        //console.log(databases)
        al=databases.Alliance
        for (i in al){
          a+=`Nom: ${al[i].Name}\nID: ${al[i].ID}\nClassement: ${al[i].Classement}\n${JSON.stringify(al[i].Profile, null, 2)}\n${JSON.stringify(al[i].Networks, null, 2)}\n\n`

          /*console.log(`Name: ${al[i].Name}`)
          console.log(`ID: ${al[i].ID}`)
          console.log(`Classement: ${al[i].Classement}`)
          console.log(al[i].Profile)
          console.log(al[i].Networks)
          */
          //console.log(al[i])
          
          
        
        }
        //console.log(a)
        

        // print all databases
        /*for (i in databases) {
            console.log(`${i.name}: ${i.type}`);
        };*/
        
  fs.close
  client.channels.cache.get(`802199511102783509`).send(`${a}`);
    }

});




}

module.exports = { dtfd };
