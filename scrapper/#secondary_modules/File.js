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
async function write(data) {
  fs.appendFile(`./scrapper/output/${file_name}`,"\n"+data, (err) => {
    if (err){ 
      console.log("Error:\n" + err);
      return ("Error:\n" + err)
  }

  });
}

async function name(){
    return file_name
}
module.exports = { write, create, name, file_name };
