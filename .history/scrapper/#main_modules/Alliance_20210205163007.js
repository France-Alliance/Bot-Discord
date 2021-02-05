const id = require(path.join(__dirname, "../../", `scrapper/data/Alliance_IDs.json`));
const file = require(path.join(__dirname, "../", `#secondary_modules/File`));
const hb = require(`../#secondary_modules/Hubs`);

async function main_alliance(page) {
  for (i in id) {
    await page.goto(
      `https://www.airlines-manager.com/alliance/network/` + id[i].toString()
    );
    const data = await page.evaluate(() => {
      const tds = Array.from(
        document.querySelectorAll(".hubsList.allianceHubsList > tbody tr td")
      );
      return tds.map((td) => td.innerText);
    });
    const a = i;
    x = 1;

    ALLIANCE = "ALLIANCE: " + a;
    await file.write("");
    await file.write("");
    await file.write("--");
    await file.write(ALLIANCE);
    await file.write("--");
    await file.write("");

    HUB=[]

    while (x < data.length / 7) {
      if (x === 1) {

        HUB.push(await hb.list(data[0]))
      }
      HUB.push(await hb.list(data[x * 7]))
      x++;

      /*
  - Alliance list of hub ✅
  - Alliance number of shared hub ✅
  - Alliance number of shared line ✅
  - Alliance KM of shared line ✅
  - AG number plane
  - AG type plane
  - AG reduction
*/
    }
    bold = await page.$$eval(".bold", e=>e.map((a)=>a.innerText))

    await file.write("HUB: " +HUB);
    await file.write("Number of HUBs: "+x);
    await file.write("Number of shared lines: "+bold[1])
    await file.write("Distance of shared lines: "+bold[2])
  }
}

module.exports = { main_alliance };
