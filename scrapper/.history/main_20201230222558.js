var request = require('request');
var cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const {username, password} = require(`./creds.json`);

function url(pg){
    console.log("Page URL : "+ pg.url()); 
}


(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Instructs the blank page to navigate a URL
    await page.goto('https://www.airlines-manager.com/login');

    // Waits until the meta element is rendered
    await page.waitForSelector('title');

    // Fetches page's title
    const title = await page.title();
    console.info(`The title is: ${title}`);

    url(page)

    // Login
    await page.type('#username', username);
    await page.type('#password', password);
    await page.click('#loginSubmit');
    await page.waitForNavigation();

    // Get cookies
    const cookies = await page.cookies();

    // Use cookies in another tab or browser
    const page2 = await browser.newPage();
    await page2.setCookie(cookies);
    // Open the page as a logged-in user
    await page2.goto('https://www.airlines-manager.com/home');

    url(page)

    //await browser.close();
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

