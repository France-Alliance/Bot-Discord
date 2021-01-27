var request = require("request");
var cheerio = require("cheerio");
const { JSDOM } = require("jsdom");
const puppeteer = require("puppeteer");
const { username, password } = require(`./creds.json`);


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 929, height: 928 });

  // Instructs the blank page to navigate a URL
  await page.goto("https://www.airlines-manager.com/login");

  await page.waitForSelector("#username");
  await page.waitForSelector("#password");
  await page.waitForSelector("#loginSubmit");

  // Login

  await page.type("#username", username);
  await page.type("#password", password);
  await page.click("#loginSubmit");
  await page.waitForSelector(".directAccess");
  await page.goto("https://www.airlines-manager.com/home");
  await page.click("#popupContainer > .popup-workshop-special > .closeMe");

  title = await page.evaluate(() => {
    return document.querySelector('div[title="Trésorerie structurelle à J-1"]').querySelector("span").textContent.trim();
  });
  console.log("Trésorerie structurelle à J-1: ",title);
/*
  - le classement de chaque Alliance
  - le nombre de KM partagés via Hub pour chaque alliance
  -  la somme des valorisation des membres de chaque alliance, pour chaque alliance
  - le nombre de hubs partagés pour chaque alliance
  - le nombre de Lignes via ces hubs partagés pour chaque alliance
  */
  console.log("end");
  //await browser.close();
})();

/* 
request("https://www.airlines-manager.com/home", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);

  }
  if( response.statusCode ==! 200 ) {
      console.log("Status code: " + response.statusCode);
  }

  var $ = cheerio.load(body);
  let title = $('title');

  let ts =   $('div .moduleArea').attr('class');


  console.log(title.text());
  console.log(ts)

});
*/
