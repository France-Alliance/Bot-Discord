const id = require(path.join(__dirname, "../../", `data/Alliance_IDs.json`));
const file = require(path.join(__dirname, "../", `#secondary_modules/File`));
const hb = require(`../#secondary_modules/Hubs`);

async function main_alliance(page, i, id) {
  
  await page.goto(
    `https://www.airlines-manager.com/alliance/network/` + id
  );
  const data = await page.evaluate(() => {
    const tds = Array.from(
      document.querySelectorAll(".hubsList.allianceHubsList > tbody tr td")
    );
    return tds.map((td) => td.innerText);
  });

  x = 1;

  /* 
  ALLIANCE = "ALLIANCE: " + a;
  await file.write("");
  await file.write("");
  await file.write("--");
  await file.write(ALLIANCE);
  await file.write("--");
  await file.write("");
*/

  HUB = [];

  while (x < data.length / 7) {
    if (x === 1) {
      HUB.push(await hb.list(data[0]));
    }
    HUB.push(await hb.list(data[x * 7]));
    x++;
  }
  bold = await page.$$eval(".bold", (e) => e.map((a) => a.innerText));

  await file.write("HUBS: " + HUB);
  await file.write("NUMBER OF HUBS: " + x);
  await file.write("NUMBER OF SHARED LINES: " + bold[1]);
  await file.write("DISTANCE OF SHARED LINES: " + bold[2]);

  await page.goto(
    `http://www.airlines-manager.com/alliance/profile/` + id
  );
  await page.waitForSelector(
    ".dashMachine.alliance_profile_statistiques_general_right .bold"
  );
  const al_in = await page.$$eval(
    ".dashMachine.alliance_profile_statistiques_general_right .bold",
    (e) => e.map((a) => a.innerText)
  );

  await file.write("TAXE: " + al_in[0].replace(" du bénéfice", ""));
  await file.write("SOLDE: " + al_in[1]);
}

module.exports = { main_alliance };
