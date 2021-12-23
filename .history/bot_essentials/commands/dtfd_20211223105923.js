const date = require(`../functions/Time`);
const cron = require("node-cron");
const chalk = require("chalk");

async function am2d(client) {
  cron.schedule("00 17 * * 6", () => {
    console.log(
      chalk.green(
        `--------------------------------------------------------------------------------------------------`
      )
    );
    console.log(`The command "am2d" was automatically & succesfully used `);
    //client.channels.cache.get(`719108278461923369`).send();
    client.channels.cache
      .get(`802199511102783509`)
      .send(`📚 | D A T A   I N C O M I N G`);
      client.channels.cache
        .get(`802199511102783509`)
        .send(`Hello! Here is the data from ${AM2S.output_file_name()[1]}`, {
          files: [AM2S.output_file_name()[0]],
        });

        channel.send({files: ['./image1.png', './image2.jpg'] });

  });
}

module.exports = { am2d };
