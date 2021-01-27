var request = require('request');
var cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const {username, password} = require(`./creds.json`);

def url(pg){
    console.log("Page URL : "+ pg.url()); 
}


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Instructs the blank page to navigate a URL
    await page.goto('https://www.airlines-manager.com');

    // Waits until the meta element is rendered
    await page.waitForSelector('title');

    // Fetches page's title
    const title = await page.title();
    console.info(`The title is: ${title}`);

    const url = await page.url();
    console.log("Page URL : "+ url); 

    // Login
    await page.type('#username', username);
    await page.type('#password', password);
    await page.click('#loginSubmit');
    await page.waitForNavigation();

    const url = await page.url();
    console.log("Page URL : "+ url); 

    //await browser.close();
    await browser.close();
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

