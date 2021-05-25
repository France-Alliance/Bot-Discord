const sc = require(`../#secondary_modules/Stars_count`);
const hb = require(`../#secondary_modules/Hubs`);
const pi = require(`../#secondary_modules/Profile_infos`);
const file = require(`../#secondary_modules/File`);
const id = require(`../data/IDs.json`);

async function main_member(page) {
  //await sc.star_count_mb(page);
  for (i in id) {
    await page.goto(
      `https://www.airlines-manager.com/alliance/members/` + id[i].toString()
    );
    const data = await page.evaluate(() => {
      const tds = Array.from(
        document.querySelectorAll("#allianceMembersList > tbody tr td")
      );
      return tds.map((td) => td.innerText);
    });
    const data_HTML = await page.evaluate(() => {
      const tds = Array.from(
        document.querySelectorAll("#allianceMembersList > tbody tr td")
      );
      return tds.map((td) => td.innerHTML);
    });
    const a = i;
    x = 1;
    while (x < data.length / 6) {
      console.log("");
      console.log("ALLIANCE: " + a);
      await file.write("ALLIANCE: " + a);
      if (x === 1) {

        PI = await pi.value(page, data_HTML[5]);
        COMPAGNY = "COMPAGNY: " + (await data[0]);
        STAR = "STAR: " + (await sc.star_count_cl(data_HTML[1]));
        HUB = "HUB: " + (await hb.list(data[3]));
        VALORISATION = "VALORISATION: " + PI[0][1];
        SOLDE = "SOLDE: " + PI[0][3];
        LAST_CO = "LAST_CO: " + PI[0][2];
        ID = "ID: " + PI[1];

        console.log(COMPAGNY);
        console.log(ID);
        console.log(STAR);
        console.log(VALORISATION);
        console.log(SOLDE);
        console.log(HUB);
        console.log(LAST_CO);
        console.log("");
        
        await file.write(COMPAGNY);
        await file.write(ID);
        await file.write(STAR);
        await file.write(VALORISATION);
        await file.write(SOLDE);
        await file.write(HUB);
        await file.write(LAST_CO);
        await file.write("\n")
      }

      PI = await pi.value(page, data_HTML[x * 6 + 5]);
      COMPAGNY = "COMPAGNY: " + (await data[x * 6]);
      STAR = "STAR: " + (await sc.star_count_cl(data_HTML[x * 6 + 1]));
      HUB = "HUB: " + (await hb.list(data[x * 6 + 3]));
      VALORISATION = "VALORISATION: " + PI[0][1];
      SOLDE = "SOLDE: " + PI[0][3];
      LAST_CO = "LAST_CO: " + PI[0][2];
      ID = "ID: " + PI[1];

      console.log(COMPAGNY);
      console.log(ID);
      console.log(STAR);
      console.log(VALORISATION);
      console.log(SOLDE);
      console.log(HUB);
      console.log(LAST_CO);
      console.log("");

      await file.write(COMPAGNY);
      await file.write(ID);
      await file.write(STAR);
      await file.write(VALORISATION);
      await file.write(SOLDE);
      await file.write(HUB);
      await file.write(LAST_CO);
      await file.write("\n")

      x++;
    }
    console.log("--");
    console.log("");
    console.log("--");
  }
}
module.exports = { main_member };
