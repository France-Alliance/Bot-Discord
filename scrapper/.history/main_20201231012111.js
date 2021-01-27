var request = require("request");
var cheerio = require("cheerio");
const { JSDOM } = require("jsdom");
const puppeteer = require("puppeteer");
const { username, password } = require(`./creds.json`);

function url(pg) {
  console.log("Page URL : " + pg.url());
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 1080 });
  const { document } = new JSDOM(page).window;

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
  console.log("to")
  await page.waitForTimeout(40000)
  console.log("te")
  await page.click("#popupContainer > .popup-workshop-special > .closeMe")
  console.log("click worked")
  divts = document.querySelector('a[title=Trésorerie structurelle à J-1]').innerHTML//
  console.log("inner worked")
  span = divts.querySelector('span').innerText
  console.log("span: ",span)
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
