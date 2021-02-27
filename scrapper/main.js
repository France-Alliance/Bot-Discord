const puppeteer = require("puppeteer");

const TEST = require(`./#Player/#main_modules/Test`);
const MEMBER = require(`./#Player/#main_modules/Member`);
const ALLIANCE = require(`./#Player/#main_modules/Alliance`);
const DS = require(`./#Player/#main_modules/Datasheet`);
const FILE = require(`./#Player/#secondary_modules/File`);
const ID = require(path.join(__dirname, "./", `data/Alliance_IDs.json`));
const { username, password } = require(path.join(__dirname, "./", `data/Creds.json`));
const PARAM = require(path.join(__dirname, "./", `data/Browser_parameter.json`));




(async function () {
  await FILE.procedur();
  await file.write("\r");

  browser = await puppeteer.launch(PARAM);

  const page = await browser.newPage();
  console.log("Browser launched");
  await page.setViewport({ width: 1200, height: 928 });
  await page.setDefaultNavigationTimeout(0);

  // Where page manipulation start
  console.log("");
  console.log("start of page manipluation");
  console.log("----");

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

  //getting the data from files
  i_l = []
  id_l = []
  for (i in ID) {
    i_l.push(i)
    id_l.push(ID[i])
  }

  y = 0
  while (y < id_l.length) {
    a = i_l[y]
    b = id_l[y]
    await file.write("\r");
    await file.write("ALLIANCE: " + a);
    await file.write("\r");
    //Execute the Datasheet module
    //await DS.tss(page)

    //Execute the MEMBER module
    await MEMBER.main_member(page, a, b);

    //Execute the SHARED module
    //await SHARED.main_shared(page);

    //Execute the AG module
    //await AG.main_AG(page);

    //Execute the ALLIANCE module
    await ALLIANCE.main_alliance(page, a, b);

    if (a != "Cygnus") {
      await file.write("\r");
      await file.write("--");
      await file.write("\r");
    } else {
      await file.write("\r");
    }
    y++;
  }

  // Where page manipulation end
  console.log("----");
  console.log("end of page manipulation");

  // Closing the browser
  await browser.close();
  console.log("");
  console.log("Browser closed");
})
  ()

/*
Player:
  |per Member|
  - Member Alliance ✅
  - Member ID ✅
  - Member star ✅
  - Member value ✅
  - Member revenue ✅
  - Member list of hub ✅

  |per Alliance|
  - Alliance list of shared hub ✅
  - Alliance number of shared hub ✅
  - Alliance number of shared line ✅
  - Alliance KM of shared line ✅
  - AG number plane ❌
  - AG type plane ❌
  - AG reduction ❌

  +|CEO|+
  - Alliance rank
  - Alliance taxes -
  - Alliance solde -
  - Alliance R&D spend

Game:
  |Plane|
  - Compagny
  - Name
  - Price
  - Range
  -
  -
  -
  -




  */
