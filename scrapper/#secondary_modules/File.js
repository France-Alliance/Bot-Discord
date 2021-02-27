var fs = require("fs");
var path = require("path");

function file_name() {
  date_ob = new Date();
  date = ("0" + date_ob.getDate()).slice(-2);
  month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  year = date_ob.getFullYear();
  return `${month}-${date}-${year}.txt`;
}

file_name = file_name()
dir = "../output/";
local_dest = dir + file_name;
dest_folder = path.resolve(__dirname, dir);
dest_file = path.resolve(__dirname, local_dest);

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function del_file(desti_file) {
  fs.access(desti_file, (err) => {
    if (err == null) {
      fs.unlink(desti_file, (err) => {
        if (err == null) {
          console.log(`OUTPUT FILE (${file_name}) WAS DELETED`);
        } else {
          console.log(`UNABLE TO DELETE OUTPUT FILE (${file_name})`);
        }
      });
    } else {
      console.log(`OUTPUT FILE (${file_name}) DON'T EXIST\n@[${desti_file}]`);
    }
  });
  await sleep(1000);
}

async function folder(desti_folder) {
  fs.access(desti_folder, (err) => {
    if (err == null) {
      console.log(`OUTPUT DIRECTORY ALREADY EXIST`);
    } else {
      console.log(`OUTPUT DIRECTORY DON'T EXIST`);
      fs.mkdir(desti_folder, (err) => {
        if (err == null) {
          console.log(`OUTPUT DIRECTORY CREATED`);
        } else {
          console.log(`UNABLE TO CREATE OUTPUT DIRECTORY`);
        }
      });
    }
  });
  await sleep(1000);
}

async function create_file() {
  fs.writeFile(dest_file, "", function (err) {
    if (err == null) {
      console.log(`OUTPUT FILE (${file_name}) WAS CREATED`);
    } else {
      console.log(`UNABLE TO CREATE OUTPUT FILE (${file_name})`);
    }
  });
  await sleep(1000);
}

async function procedur() {
  console.log("");

  try {
    await folder(dest_folder);
  } catch (e) {
    console.log(e);
  }

  try {
    await del_file(dest_file);
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
  console.log(data);
  fs.appendFile(dest_file, "\n" + data, (err) => {
    if (err) {
      console.log("Error:\n" + err);
      return "Error:\n" + err;
    }
  });
  await sleep(50);
}

async function name() {
  return file_name;
}
module.exports = { folder, write, procedur, name, file_name, dest_file };
