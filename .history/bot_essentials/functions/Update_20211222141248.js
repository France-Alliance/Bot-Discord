var { PythonShell } = require("python-shell");
const date = require(`./Time`);
const cron = require("node-cron");
const shell = require("shelljs");
const time = require(`./Time`);
const chalk = require("chalk");
const os = require("os");
const path = require("path");
const fs = require("fs");

function update_bot() {
  cron.schedule("00 03 * * *", () => {
    console.log(
      chalk.green(
        `--------------------------------------------------------------------------------------------------`
      )
    );
    console.log(
      `Control Tower is updating ! @ ${time.hours()}:${time.minutes()}:${time.secondes()} - ${time.date()}/${time.month()}/${time.year()}`
    );
    shell.exec("git fetch --all");
    shell.exec("git reset --hard origin/master");
    console.log(
      `Control Tower has updated ! @ ${time.hours()}:${time.minutes()}:${time.secondes()} - ${time.date()}/${time.month()}/${time.year()}`
    );
  });
}

function data_feed() {
  cron.schedule("00 02 * * *", () => {
    if (os.hostname() == "raspberrypi") {
      options = {
        pythonPath: "/usr/bin/python3",
        mode: "text",
      };
    } else {
      options = {
        mode: "text",
      };
    }

    let pyshell = new PythonShell(
      path.join(__dirname, "../scrapper/main.py"),
      options
    );

    pyshell.on("message", (res) => {
      if (res.match(regex)) {
        var regex = /NewScrapper\/data\/.*\.json/gm;
        //console.log("File Name : " + res.match(regex));
        nameFile = res.replace("File Name : ", "");
      } else {
        console.log(res);
      }
    });

    pyshell.end((err, code, signal) => {
      if (err) {
        throw err;
      }
      if (nameFile != null) {
        nameFile = null;
        finnish = true;

        pyshell = new PythonShell(
          path.join(__dirname, "../scrapper/Utils.py"),
          options
        );

        pyshell.on("message", (res) => {
          //console.log("File Name 2 : " + res);
        });
        pyshell.end((err, code, signal) => {
          if (err) {
            throw err;
          }
        });
      } else {
        message.reply("Error in commands");
      }
    });
  });
}


function lm(message) {
  function fcdate(data, opt1) {
    mydate = new Date(data);

    var options = { month: "long" };
    var curr_timestamp_now = new Date().getTime();
    var curr_timestamp = mydate.getTime();
    var curr_date = mydate.getDate();
    if (opt1 == false) {
      var curr_month = mydate.getMonth();
      var curr_year = 1970 - mydate.getFullYear();
    } else {
      var curr_month = new Intl.DateTimeFormat("fr-FR", options).format(mydate);
      var curr_year = mydate.getFullYear();
    }
    var curr_hour = mydate.getHours();
    var curr_minute = mydate.getMinutes();
    var curr_second = mydate.getSeconds();

    return [
      mydate,
      curr_timestamp_now,
      curr_timestamp,
      curr_date,
      curr_month,
      curr_year,
      curr_hour,
      curr_minute,
      curr_second,
    ];
  }

  const data = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        `../../bot_essentials/compagnon_scripts/lm_data/${message.guild.id}.json`
      )
    )
  );
  allmember = [];
  prstmember = [];

  for (let [key, value] of message.guild.members.cache) {
    allmember.push(key);
  }

  for (var key in data) {
    prstmember.push(key);
  }

  for (j in allmember) {
    if (!prstmember.includes(allmember[j])) {
      message.channel.send(`<@!${allmember[j]}>, I have no message registered \n__Please send a message__`);
    }
  }

  //console.log(data);
  //console.log(allmember);
  //console.log(prstmember);

  for (i in data) {
    var date = fcdate(data[i], true);

    t_n = date[1]; //mtn
    t = date[2]; //msg
    r = date[1] - date[2];

    //console.log(t_n);
    //console.log(t);
    //console.log(r);

    //console.log(t_n/60)
    //console.log(t/60)
    //console.log(r/60)

    //console.log(new Date(t_n))
    //console.log(new Date(t))
    //console.log(new Date(r))

    //console.log(message.guild.member(i))

    //console.log(i)
    //console.log(message.guild.member(i).user.id)
    
    //console.log(message.guild.member(i).nickname)
    if (message.guild.member(i) == null ){
      //console.log(message.guild.member(i))
    } else if (message.guild.member(i).nickname != null) {
      username = message.guild.member(i).nickname;
      mydatestr = `${username}(${i}) is ok`;
      if (r >= 1296000000) {
        //console.log("Matched 15")
        var date = fcdate(date[1] - date[2], false);
        //console.log(`D:${date[3]}\nM:${date[4]}\nY:${date[5]}`)
        if (date[5] < 0) {
          var mydatestr = `${username} send his last massage a long long time ago (${date[3]} Day(s) >= 15 Days)  `;
        } else if (date[4] <= 12) {
          var mydatestr = `${username} send his last massage a long long time ago (${date[4]} Month(s) >= 15 Days)`;
        } else if(date[3] <= 31){
          var mydatestr = `${username} send his last massage a long long time ago (${date[5]} Year(s) >= 15 Days)`;
        }
        console.log(`User:${username}\rDay: ${date[3]} Month: ${date[4]} Year: ${date[5]}`)
        //message.channel.send(`${mydatestr}`);
      } else if (r >= 604800000) {
        //console.log("Matched 7")
        var date = fcdate(r, false);
        //console.log(`D:${date[3]}`)
        if (date[3] <= 31) {
          var mydatestr = `${username} send his last massage a long time ago (${date[3]} Day(s) >= 7 Days)`;
        }
        message.channel.send(`${mydatestr}`);
      }
    } else {
      username = message.guild.member(i).user.username;
      mydatestr = `${username}(${i}) is ok`;
      if (r >= 1296000000) {
        //console.log("Matched 15")
        var date = fcdate(date[1] - date[2], false);
        //console.log(`D:${date[3]}\nM:${date[4]}\nY:${date[5]}`)
        if (date[3] <= 31) {
          var mydatestr = `${username} send his last massage a long long time ago (${date[3]} Day(s) >= 15 Days)  `;
        } else if (date[4] <= 12) {
          var mydatestr = `${username} send his last massage a long long time ago (${date[4]} Month(s) >= 15 Days)`;
        } else {
          var mydatestr = `${username} send his last massage a long long time ago (${date[5]} Year(s) >= 15 Days)`;
        }
        message.channel.send(`${mydatestr}`);
      } else if (r >= 604800000) {
        //console.log("Matched 7")
        var date = fcdate(r, false);
        //console.log(`D:${date[3]}`)
        if (date[3] <= 31) {
          var mydatestr = `${username} send his last massage a long time ago (${date[3]} Day(s) >= 7 Days)`;
        }
        message.channel.send(`${mydatestr}`);
      }
    }
    //console.log(mydatestr);
  }
}

module.exports = { update_bot, data_feed, lm };

/*
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
*/
