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
    //await page.waitForTimeout(4000)
    console.log("te")
    await page.click("#popupContainer > .popup-workshop-special > .closeMe")
    console.log("click worked")

    console.log(await page.$('#largeContainer > #mainContainer > #mainContent > #mainContentLeft > #pageContent > #content > #newAirlinesManagerHomePage > #dashboardContent > .moduleArea > .indexModule.companyStats.fr > .content > a[title="Trésorerie structurelle à J-1"]'))
    //console.log(await page.$('a[title="Trésorerie structurelle à J-1"]'))




  //divts = document.querySelector('#largeContainer') // > .moduleArea > .indexModule companyStats fr > .content > a[title="Trésorerie structurelle à J-1"] > span
  //console.log("inner worked:", divts)
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
