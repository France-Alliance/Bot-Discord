const date = require(`./Time`);
const cron = require("node-cron");
const chalk = require("chalk");

async function dtfd(client) {
  cron.schedule("43 11 * * *", () => {
    console.log(
      chalk.green(
        `--------------------------------------------------------------------------------------------------`
      )
    );
    console.log("PART 0");
    //client.channels.cache.get(`719108278461923369`).send();
    client.channels.cache
      .get(`802199511102783509`)
      .send(`📚 | D A T A   I N C O M I N G\rHello! Here is the data from ${date.date()}-${date.month()}-${date.year()}`);
    console.log("PART 1");
    client.channels.cache
      .get(`802199511102783509`)
      .send({files: [`../../bot_essentials/scrapper/data/${date.date()}-${date.month()}-${date.year()}.json`] });
      /*.send(
        `Hello! Here is the data from ${date.date()}-${date.month()}-${date.year()}`,
        {
          files: [
            `../scrapper/data/${date.date()}-${date.month()}-${date.year()}.json`,
          ],
        }
      )*/
    console.log("PART 2");
  });
  //console.log(`The command "am2d" was automatically & succesfully used `);
}

module.exports = { dtfd };
