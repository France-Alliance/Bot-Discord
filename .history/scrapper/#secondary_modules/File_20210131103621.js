var fs = require("fs");
var path = require("path");

date_ob = new Date();
date = ("0" + date_ob.getDate()).slice(-2);
month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
year = date_ob.getFullYear();

file_name = `${date}-${month}-${year}.txt`;
dir = "/scrapper/output/";
dest = path.resolve(dir, file_name);

async function del() {
  fs.access(dest, (err) => {
    if (err != null) {
      console.log(`OUTPUT FILE (${file_name}) ALREADY EXIST`);
      console.log("'"+dest+"'")
    } else {
      fs.unlink(dest, (err) => {
        if (err != null) {
          console.log(`UNABLE TO DELETE OUTPUT FILE (${file_name})`);
        } else {
          console.log(`OUTPUT FILE (${file_name}) WAS DELETED`);
        }
      });
    }
  });
}

async function create() {
  console.log("");

  fs.access(dir, (err) => {
    if (err != null) {
      console.log(`OUTPUT DIRECTORY ALREADY EXIST`);
    } else {
      fs.mkdir(dir, (err) => {
        if (err != null) {
          console.log(`UNABLE TO CREATE OUTPUT DIRECTORY`);
        } else {
          console.log(`OUTPUT DIRECTORY CREATED`);
        }
      });
    }
  });

  try {
    await del();
  } finally {
    fs.writeFile(dest, "", function (err) {
      if (err != null) {
        console.log("ERROR:\n" + err);
      } else {
        console.log("OUTPUT FILE CREATED");
      }
    });
  }
}
async function write(data) {
  /*
  fs.appendFile("/home/pi/git/Bot-Discord/scrapper/output/"+file_name, "\n" + data, (err) => {
    if (err) {
      console.log("Error:\n" + err);
      return "Error:\n" + err;
    }
  });
  */
}

async function name() {
  return file_name;
}
module.exports = { write, create, name, file_name };
