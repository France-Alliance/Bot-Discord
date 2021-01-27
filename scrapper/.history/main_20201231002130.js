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

  await page.waitForNavigation({ waitUntil: 'load' });

  // Login
  console.log("typing username")
  await page.type("#username", username);
  console.log("typed username")
  console.log("typing password")
  await page.type("#password", password);
  console.log("typed password")
  console.log("click submit")
  await page.click("#loginSubmit");
  console.log("clicked submit")
  console.log("waiting 2000")
  await page.waitForTimeout(2000);
  console.log("waited 2000")
  console.log("going home ")
  await page.goto("https://www.airlines-manager.com/home");
  console.log("gone home ")
  await page.waitForNavigation({ waitUntil: 'load' });
  console.log(await page.click("#overlay"))
  divts = document.querySelector('a[title="Trésorerie structurelle à J-1"]').innerHTML
  span = divts.querySelector('span').innerText
  console.log(span)
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
