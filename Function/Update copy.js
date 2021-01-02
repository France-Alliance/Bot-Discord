const cron = require("node-cron");
const shell = require("shelljs");
const time = require(`./time.js`);

function update(){
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

module.exports = {update}
