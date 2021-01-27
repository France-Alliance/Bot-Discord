const puppeteer = require("puppeteer");

const TEST = require(`./#main_modules/Test`);
const SHARED = require(`./#main_modules/Shared`);
const MEMBER = require(`./#main_modules/Member`);
const AG = require(`./#main_modules/AG`);
const ALLIANCE = require(`./#main_modules/Alliance`);

const { username, password } = require(`./creds.json`);


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 929, height: 928 });

  // Where page manipulation start
  console.log("");
  console.log("start of page manipluation");
  console.log("----");
  console.log("")

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

  // Close the pop-up if it exist
  try {
    await page.click("#popupContainer > .popup-workshop-special > .closeMe");
    console.log("pop up: closed")
  } catch (error) {
    console.log("pop up: null")
  } finally{
    console.log("")
  }

  //Execute the TEST module
  await TEST.prelaunch_test(page);

  console.log("")

  //Execute the MEMBER module
  await MEMBER.main_member(page);

  console.log("")

  //Execute the SHARED module
  //await SHARED.main_shared(page);

  //Execute the AG module
  //await AG.main_AG(page);

  //Execute the ALLIANCE module
  //await ALLIANCE.main_alliance(page);

 


  // Where page manipulation end
  console.log("----");
  console.log("end of page manipulation");

  // Closing the browser
  //await browser.close();
})();

/*
Member:
  - Member value
  - Member star
  - Member revenue

  - Number of shared hub
  - Number of shared line
  - KM of shared line

  - AG number plane
  - AG type plane
  - AG reduction


  CEO:
  - Alliance rank
  - Alliance taxes
  - Alliance solde
  - Alliance R&D spend 
  */