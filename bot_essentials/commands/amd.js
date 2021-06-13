const date = require(`../functions/Time`);
const { PythonShell } = require("python-shell");
const os = require('os')
const path = require("path");

let nameFile = null,
  finnish = false;

module.exports = {
  name: "amd",
  description: "Summmon a file with all France Alliance AM2 Data (take ≈ 10mn)",
  aliases: ["am2d"],
  usage:
    "\r*Alliance* : --alliance    {Name | (recommended) ID }    (optional){ ID, Classement, Profile, Members, Networks};\r*Members* : --member    {Name | (recommended) ID}    (optional){Alliance Name | Alliance ID}    (optional){ID, Name, Star, Owner, Hubs, Role, Valorisation, Solde, LastConnection};\r*All* : --all",
  cooldown: 5,
  execute(message) {
    message.content = message.content.replace("!!am2d ", "!!amd ");
    args = message.content.replace("!!amd ", "");
    //console.log(args);
    message.channel.send("Gathering the data...\rPlease wait");

    if (os.hostname() == "raspberrypi") {
        options = {
            pythonPath: "/usr/bin/python3",
            mode: "text",
            args: [args],
          };
    } else {
        options = {
            mode: "text",
            args: [args],
          };
    }
    
    let pyshell = new PythonShell(path.join(__dirname, "../../bot_essentials/scrapper/Args.py"), options);

    pyshell.on("message", (res) => {
      if (res.match(regex)) {
        var regex = /NewScrapper\/data\/.*\.json/gm;
        console.log("File Name : " + res.match(regex));
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
        try {
          message.reply(
            ` :arrow_right: data of ${date.date()}-${date.month()}-${date.year()} is ready !`,
            {
              files: [
                {
                  attachment: nameFile,
                  name: nameFile.split("/")[nameFile.split("/").length - 1],
                },
              ],
            }
          );
        } catch (error) {
          message.reply("Error in file / message");
          console.log(error);
        }

        nameFile = null;
        finnish = true;
       
        pyshell = new PythonShell( path.join(__dirname, "../../bot_essentials/scrapper/Utils.py"), options);

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
  },
};
