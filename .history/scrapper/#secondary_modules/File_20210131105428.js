var fs = require("fs");
var path = require("path");

date_ob = new Date();
date = ("0" + date_ob.getDate()).slice(-2);
month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
year = date_ob.getFullYear();

file_name = `${date}-${month}-${year}.txt`;
dir = "../output/";
local_dest = dir + file_name;
dest_folder = path.resolve(__dirname, dir);
dest_file = path.resolve(__dirname, local_dest);

async function del() {
  fs.access(dest_file, (err) => {
    if (err != null) {
      console.log(`OUTPUT FILE (${file_name}) ALREADY EXIST\n@[${dest_file}]`);
    } else {
      fs.unlink(dest_file, (err) => {
        if (err != null) {
          console.log(`UNABLE TO DELETE OUTPUT FILE (${file_name})`);
        } else {
          console.log(`OUTPUT FILE (${file_name}) WAS DELETED`);
        }
      });
    }
  });
}

async function folder() {
  fs.access(dest_folder, (err) => {
    if (err != null) {
      console.log(`OUTPUT DIRECTORY ALREADY EXIST`);
      console.log(err)
    } else {
      fs.mkdir(dest_folder, (err) => {
        if (err != null) {
          console.log(`UNABLE TO CREATE OUTPUT DIRECTORY`);
        } else {
          console.log(`OUTPUT DIRECTORY CREATED`);
        }
      });
    }
  });
}

async function create() {
  console.log("");

  try {
    await folder();
  } catch (e) {
    console.log(e);
  }

  try {
    await del();
  } catch (e) {
    console.log(e);
  } finally {
    fs.writeFile(dest_file, "", function (err) {
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
