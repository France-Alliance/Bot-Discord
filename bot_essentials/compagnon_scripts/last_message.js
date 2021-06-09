const discord = require(`discord.js`);
const path = require("path");
const fs = require("fs");
const os = require("os");
const process = require('process');

const { token } = require(`../token.json`);

const client = new discord.Client();

ts = Date.now();

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

console.log("Start script");
var data = "";

client.on("message", async (message) => {
  console.log("");
  console.log("------");
  console.log("");

  m_guild = message.guild;
  m_author = message.author.toString().replace("<@", "").replace(">", "");
  m_date = new Date(message.createdTimestamp).toISOString();
  //console.log(m_guild.name+" ("+m_guild.id+")")
  console.log(
    message.author.username +
      "#" +
      message.author.discriminator +
      " (" +
      message.author.id +
      ")"
  );
  console.log(`@ ${m_date}`);

  dirPath = path.join(__dirname, `/lm_data`);
  filePath = path.join(dirPath, `/${m_guild.id}.json`)
  
  if (fs.existsSync(dirPath)) {
    //console.log("Directory exists !");
  } else {
    console.log("Directory not found.");
    fs.mkdir(dirPath, function (err) {
      if (err) throw err;
      console.log("Directory is created.");
    });
  }
  
  if (fs.existsSync(filePath)) {
    //console.log(`${m_guild.id}.json exist`);
  } else {
    console.log(`${m_guild.id} don't exist`);
    fs.writeFile(filePath, "{}", function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  }

  await sleep(1000);

  const data = JSON.parse(fs.readFileSync(filePath));
  data[m_author] = `${m_date}`;
  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 4)
  );
});
client.login(token);

