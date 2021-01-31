const puppeteer = require("puppeteer");
const IP = require(`../functions/IP`);

const TEST = require(`./#main_modules/Test`);
const SHARED = require(`./#main_modules/Shared`);
const MEMBER = require(`./#main_modules/Member`);
const AG = require(`./#main_modules/AG`);
const ALLIANCE = require(`./#main_modules/Alliance`);
const FILE = require(`./#secondary_modules/File`);
const { username, password } = require(`./data/creds.json`);

async function script() {
  await FILE.create();

  browser = await puppeteer.launch({
    args: ["--no-sandbox", "--window-size=1920x1080"],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 928 });

  // Where page manipulation start
  console.log("");
  console.log("start of page manipluation");
  console.log("----");
  console.log("");

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
    console.log("pop up: closed");
  } catch (error) {
    console.log("pop up: null");
  } finally {
    console.log("");
  }

  //Execute the TEST module
  //await TEST.prelaunch_test(page);

  //console.log("")

  //Execute the MEMBER module
  await MEMBER.main_member(page);
  console.log("");

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
}

function output_file_name() {
  return FILE.file_name;
}

module.exports = { script, output_file_name };

/*
Member:
  - Member Alliance ✅
  - Member star ✅
  - Member value
  - Member revenue

  - List of hub ✅
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
