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
        COMPAGNY="COMPAGNY: " + await data[0]
        STAR="STAR: " + (await sc.star_count_cl(data_HTML[1]))
        HUB="HUB: " + (await hb.list(data[3]))

        console.log(COMPAGNY);
        await pi.value(page, data_HTML[5]);
        console.log(STAR);
        console.log(HUB);
        console.log("");

        await file.write(COMPAGNY);
        await pi.value(page, data_HTML[5]);
        await file.write(STAR);
        await file.write(HUB);
        await file.write("\n");
      }
      COMPAGNY="COMPAGNY: " + await data[x * 6]
      STAR="STAR: " + (await sc.star_count_cl(data_HTML[x * 6 + 1]))
      HUB="HUB: " + (await hb.list(data[x * 6 + 3]))

      console.log(COMPAGNY);
      await pi.value(page, data_HTML[x * 6 + 5]);
      console.log(STAR);
      console.log(HUB);
      console.log("");

      await file.write(COMPAGNY);
      await pi.value(page, data_HTML[x * 6 + 5]);
      await file.write(STAR);
      await file.write(HUB);
      await file.write("\n");
      x++;
    }
    console.log("--");
    console.log("");
    console.log("--");
  }
}
module.exports = { main_member };
