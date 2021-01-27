const puppeteer = require("puppeteer");

const TEST = require(`./main_modules/Test`);
const CEO = require(`./main_modules/CEO`);
const MEMBER = require(`./main_modules/Member`);

const { username, password } = require(`./creds.json`);


(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 929, height: 928 });

  // Where page manipulation start
  console.log("start of page manipluation");
  console.log("");

  // Instructs the blank page to navigate a URL
  await page.goto("https://www.airlines-manager.com/login");

  await page.waitForSelector("#username");
  await page.waitForSelector("#password");
  await page.waitForSelector("#loginSubmit");

  // Login & going home
  await page.type("#username", username);
  await page.type("#password", password);
  await page.click("#loginSubmit");
  await page.waitForSelector(".directAccess");
  await page.goto("https://www.airlines-manager.com/home");
  await page.click("#popupContainer > .popup-workshop-special > .closeMe");

  //Execute the CEO module
  await CEO.main_ceo(page);

  // Where page manipulation end
  console.log("");
  console.log("end of page manipulation");

  // Closing the browser
  await browser.close();
})();

/*
  - Number of shared hub
      - Nb of line
      - KM of line
    
  - Member value
  - Member star
  - Member revenue

  - AG number plane
  - AG type plane
  - AG reduction
  
  - Alliance rank
  - Alliance taxes
  - Alliance solde
  - Alliance R&D spend 
  */