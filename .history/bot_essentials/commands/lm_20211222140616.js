const fs = require("fs");
const path = require("path");
const functions = require(`../functions_manager`);
const update = functions.update;
module.exports = {
  name: "lm",
  description: "Display a liste of timestamp of last message by users",
  aliases: ["LM","l"],
  usage: "<> <ago> <warn> <json> <@user>",
  cooldown: 1,
  execute(message, args) {
    if (args == "ago") {
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
          var curr_month = new Intl.DateTimeFormat("fr-FR", options).format(
            mydate
          );
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
          //message.channel.send(`<@!${allmember[j]}>, I have no message registered \n__Please send a message__`);
        }
      }

      console.log(data);
      console.log(allmember);
      console.log(prstmember);

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

        mydatestr = `Error with <@!${i}> (${i})`;

        try {
          //console.log(i)
          //console.log(message.guild.member(i).user.id)

          if (message.guild.member(i).nickname != null) {
            username = message.guild.member(i).nickname;
          } else if (message.guild.member(i).user.username != null) {
            username = message.guild.member(i).user.username;
          } else {
            username = i;
          }
          //console.log(username);
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
          } else if (r >= 604800000) {
            //console.log("Matched 7")
            var date = fcdate(r, false);
            //console.log(`D:${date[3]}`)
            if (date[3] <= 31) {
              var mydatestr = `${username} send his last massage a long time ago (${date[3]} Day(s) >= 7 Days)`;
            }
          }
          var date = fcdate(r, false);
          //console.log(`D:${date[3]}\nM:${date[4]}\nY:${date[5]}\nH:${date[6]}\nM:${date[7]}\nS:${date[8]}`)
          if (date[3] <= 31 && date[3] != 0) {
            var mydatestr = `${username} send his last massage ${date[3]} Day(s) ago`;
          } else if (date[6] <= 24 && date[6] != 0) {
            var mydatestr = `${username} send his last massage ${date[6]} Hour(s) ago`;
          } else if (date[7] <= 60 && date[7] != 0) {
            var mydatestr = `${username} send his last massage ${date[7]} Minute(s) ago`;
          } else if (date[8] <= 60 && date[8] != 0) {
            var mydatestr = `${username} send his last massage ${date[8]} Second(s) ago`;
          }
          //console.log(`${username} (${i})`);
          //console.log(new Date(r));
        } catch {
        } finally {
          message.channel.send(`${mydatestr}`);
        }
      }
      //console.log();
    } else if (args == "warn") {
      update.lm(message);
    } else if (args == "json") {
      message.channel.send(
        ` :arrow_right: data of ${message.guild} is ready !`,
        {
          files: [
            path.join(
              __dirname,
              `../../bot_essentials/compagnon_scripts/lm_data/${message.guild.id}.json`
            ),
          ],
        }
      );
    } else if (message.mentions.users.size === 0) {
      const data = JSON.parse(
        fs.readFileSync(
          path.join(
            __dirname,
            `../../bot_essentials/compagnon_scripts/lm_data/${message.guild.id}.json`
          )
        )
      );

      for (i in data) {
        mydate = new Date(data[i]);
        //console.log(i,data[i])

        var options = { month: "long" };
        var curr_timestamp_now = new Date();
        var curr_timestamp = mydate.getTime();
        var curr_date = mydate.getDate();
        var curr_month = new Intl.DateTimeFormat("fr-FR", options).format(
          mydate
        );
        var curr_year = mydate.getFullYear();
        var curr_hour = mydate.getHours();
        var curr_minute = mydate.getMinutes();
        var curr_second = mydate.getSeconds();
        try {
          username = "*[UNKNOWN (probably a bot)]*";
          //console.log(message.guild.member(i).user.username)
          if (message.guild.member(i).nickname != null) {
            username = message.guild.member(i).nickname;
          } else if (message.guild.member(i).user.username != null) {
            username = message.guild.member(i).user.username;
          } else {
            username = i;
          }
        } catch {
        } finally {
          if (curr_timestamp_now - curr_timestamp >= 1296000) {
            var mydatestr =
              `${username} send his last massage a long long time ago (15J) @ ` +
              curr_date +
              " " +
              curr_month +
              " " +
              curr_year +
              " | " +
              curr_hour +
              ":" +
              curr_minute +
              ":" +
              curr_second;
          } else if (curr_timestamp_now - curr_timestamp >= 604800) {
            var mydatestr =
              `${username} send his last massage a long time ago (7J) @ ` +
              curr_date +
              " " +
              curr_month +
              " " +
              curr_year +
              " | " +
              curr_hour +
              ":" +
              curr_minute +
              ":" +
              curr_second;
          }
          var mydatestr =
            `${username} send his last massage @ ` +
            curr_date +
            " " +
            curr_month +
            " " +
            curr_year +
            " | " +
            curr_hour +
            ":" +
            curr_minute +
            ":" +
            curr_second;
          message.channel.send(`${mydatestr}`);
        }
      }
    } else if (message.mentions.users.size >= 1) {
      //message.channel.send(`His ID is ${message.mentions.users.map((user) => user.id)} `);
      const data = JSON.parse(
        fs.readFileSync(
          path.join(
            __dirname,
            `../../bot_essentials/compagnon_scripts/lm_data/${message.guild.id}.json`
          )
        )
      );

      for (i in args) {
        if (args[i].includes("<@!")) {
          ID = args[i].toString().replace("<@!", "").replace(">", "");
          if (message.guild.member(ID).nickname != null) {
            message.channel.send(
              `${message.guild.member(ID).nickname} send his last message @ **${
                data[ID]
              }**`
            );
          } else if (message.guild.member(ID).user.username != null) {
            message.channel.send(
              `${
                message.guild.member(ID).user.username
              } send his last message @ **${data[ID]}**`
            );
          }
        }
      }
    }
  },
};
