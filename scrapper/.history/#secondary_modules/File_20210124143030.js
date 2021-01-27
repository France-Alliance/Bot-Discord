var fs = require("fs");
var path = require("path");

async function write() {
  date_ob = new Date();
  date = ("0" + date_ob.getDate()).slice(-2);
  month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  year = date_ob.getFullYear();
  file_name = `${date}-${month}-${year}.txt`;
  dir = "./output/";
  f = path.basename(file_name);
  dest = path.resolve(dir, f);

  console.log("");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(` CREATED`);
  } else {
    console.log(`OUTPUT DIRECTORY ALREADY EXIST`);
  }

  fs.writeFile(file_name, "", function (err) {
    if (err) throw err;
    else {
      console.log("OUTPUT FILE CREATED");
      fs.rename(file_name, dest, (err) => {
        if (err) throw err;
        else console.log("OUTPUT MOVED TO OUTPUT DIRECTORY ");
      });
    }
  });
}

fs.writeFile(`./output/file.js`, data, (err) => {
  if (err) logger.error("Error:\n" + err);
});

module.exports = {write}