var fs = require("fs");
var path = require("path");

date_ob = new Date();
date = ("0" + date_ob.getDate()).slice(-2);
month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
year = date_ob.getFullYear();
file_name = `${date}-${month}-${year}.txt`;
dir = "../output/";
f = path.basename(file_name);
dest = path.resolve(dir, f);

async function create() {
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
async function write(data){
    fs.appendFile(`./output/${file_name}`, "\n", (err) => {
        if (err) logger.error("Error:\n" + err);
      });
    fs.appendFile(`./output/${file_name}`, data, (err) => {
        if (err) logger.error("Error:\n" + err);
      });
      await sleep(100)
}


module.exports = {write, create}