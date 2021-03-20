var { PythonShell } = require("python-shell");
const date = require(`../functions/Time`);
const cron = require("node-cron");
const shell = require("shelljs");
const time = require(`./Time`);
const chalk = require("chalk");

function update_bot() {
  cron.schedule("00 03 * * *", () => {
    console.log(
      `Control Tower is updating ! @ ${time.hours()}:${time.minutes()}:${time.secondes()} - ${time.date()}/${time.month()}/${time.year()}`
    );
    shell.exec("sudo git fetch --all");
    shell.exec("sudo git reset --hard origin/master");
    console.log(
      `Control Tower has updated ! @ ${time.hours()}:${time.minutes()}:${time.secondes()} - ${time.date()}/${time.month()}/${time.year()}`
    );
    console.log(`------------`);
  });
}

function data_feed(client) {
  cron.schedule("34 21 * * 5", () => {
    console.log(
      chalk.green(
        `--------------------------------------------------------------------------------------------------`
      )
    );
    let pyshell = new PythonShell("NewScrapper/main.py");
    dest = client.channels.cache.get(`802199511102783509`);
    //client.channels.cache.get(`719108278461923369`).send();


    dest.send(`📚 | D A T A   I N C O M I N G`);
    
    // sends a message to the Python script via stdin
    // pyshell.send('hello');

    pyshell.on("message", function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
    });
    
    // end the input stream and allow the process to exit
    pyshell.end(function (err, code, signal) {
      if (err) {
        throw err;
      }
      //console.log('');
      //console.log('The exit code was: ' + code);
      //console.log('The exit signal was: ' + signal);
      //console.log('');
      console.log("execution of the python script is finished");
      console.log("sending the file");
      dest.send(
        `📚 | D A T A :arrow_right: ${date.date()}-${date.month()}-${date.year()}`,
        {
          files: [
            `NewScrapper/data/${date.date()}-${date.month()}-${date.year()}.json`,
          ],
        }
      );
    });

    console.log(`The command "am2d" was automatically & succesfully used `);

  });
}
module.exports = { update_bot, data_feed };
