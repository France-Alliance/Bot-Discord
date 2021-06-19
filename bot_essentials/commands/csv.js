const date = require(`../functions/Time`);
const { PythonShell } = require("python-shell");
const os = require("os");
const path = require("path");

module.exports = {
  name: "csv",
  description: "Summmon a file with all France Alliance AM2 Data (take ≈ 10mn)",
  aliases: [],
  usage: "",
  cooldown: 5,
  execute(message, args) {
    message.channel.send("Gathering the data...\rPlease wait");

    if (os.hostname() == "raspberrypi") {
      options = {
        pythonPath: "/usr/bin/python3",
        mode: "text",
        args: [args],
      };
      name = "bot_essentials/compagnon_scripts/csv_data/"
    } else {
      options = {
        mode: "text",
        args: [args],
      };
      name = "../../bot_essentials/compagnon_scripts/csv_data/"
    }

    let pyshell = new PythonShell(
      path.join(__dirname, "../../bot_essentials/compagnon_scripts/jtc.py"),
      options
    );

    pyshell.on("message", (res) => {
      //console.log("res: " + res);
    });

    pyshell.end((err, code, signal) => {
      if (err) {
        console.log(err);
      } else {
        message.channel.send({
          files: [
            `${name}XCEL1.csv`,
            `${name}XCEL2.csv`,
          ],
        });
      }
    });
  },
};
