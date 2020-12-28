const chalk = require("chalk");

function art() {
  console.log(`
  _____               _                _         _______                         
 / ____|             | |              | |       |__   __|                        
| |      ___   _ __  | |_  _ __  ___  | |  ___     | |  ___ __      __ ___  _ __ 
| |     / _ \\ | '_ \\ | __|| '__|/ _ \\ | | / _ \\    | | / _ \\\\ \\ /\\ / // _ \\| '__|
| |____| (_) || | | || |_ | |  | (_) || ||  __/    | || (_) |\\ V  V /|  __/| |   
 \\_____|\\___/ |_| |_| \\__||_|   \\___/ |_| \\___|    |_| \\___/  \\_/\\_/  \\___||_| 
______________________________________________________________________________________________
`);
}

function info(timeHServer, timeMServer, timeSServer, cliguildsize, cliusersize, clichannelsize) {
  console.log(
    chalk.green(
      `--------------------------------------------------------------------------------------------------`
    )
  );
  console.log(
    `Bot is ready @ ${timeHServer}:${timeMServer}:${timeSServer}\nHe has started in ${cliguildsize} guilds, with ${cliusersize} users in ${clichannelsize} channels`
  );
  console.log(
    chalk.green(
      `--------------------------------------------------------------------------------------------------`
    )
  );
  console.log(
    chalk.green(
      `                                            COMMAND LOG                                           `
    )
  );
}

function activity(cliuser, cliguildsize, prefix, state){
  cliuser.setActivity(
    `${cliguildsize} servers | ${prefix} help | ${state}`,
    {
      type: "WATCHING",
    }
  );
}

module.exports = { art, info, activity };
