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

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

async function del_file() {
  fs.access(dest_file, (err) => {
    if (err != null) {
      console.log(`OUTPUT FILE (${file_name}) DON'T EXIST\n@[${dest_file}]`);
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
  await sleep(1000)
}

async function folder() {
  fs.access(dest_folder, (err) => {
    if (err != null) {
      console.log(`OUTPUT DIRECTORY DON'T EXIST`);
      fs.mkdir(dest_folder, (err) => {
        if (err != null) {
          console.log(`UNABLE TO CREATE OUTPUT DIRECTORY`);
        } else {
          console.log(`OUTPUT DIRECTORY CREATED`);
        }
      });
      
    } else {
      console.log(`OUTPUT DIRECTORY ALREADY EXIST`);
    }
  });
  await sleep(1000)
}

async function create_file(){
  fs.writeFile(dest_file,"", function (err) {
    if (err != null) {
      console.log(`UNABLE TO CREATE OUTPUT FILE`);
    } else {
      console.log("OUTPUT FILE CREATED");
    }
  });
  await sleep(1000)
}

async function procedur() {
  console.log("");

  try {
    await folder();
  } catch (e) {
    console.log(e);
  }

  try {
    await del_file();
  } catch (e) {
    console.log(e);
  }

  try {
    await create_file();
  } catch (e) {
    console.log(e);
  }
}
async function write(data) {
  fs.appendFile(dest_file, "\n"+data, (err) => {
    if (err) {
      console.log("Error:\n" + err);
      return "Error:\n" + err;
    }
  });
  await sleep(175)
}

async function name() {
  return file_name;
}
module.exports = { write, procedur, name, file_name };
