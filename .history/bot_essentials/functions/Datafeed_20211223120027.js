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
        console.log(databases)
        al=databases.Alliance[0]
        console.log(al[0])

        // print all databases
        /*for (i in databases) {
            console.log(`${i.name}: ${i.type}`);
        };*/
    }

});


}

module.exports = { dtfd };
