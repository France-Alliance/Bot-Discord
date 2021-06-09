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
      //await file.write("ALLIANCE: " + a);
      if (x === 1) {
        /*
        console.log("COMPAGNY: " + data[0]);
        console.log("ID: " + (await pi.value(page, data_HTML[5])[0]));
        console.log("STAR: " + (await sc.star_count_cl(data_HTML[1])));
        console.log("HUB: " + (await hb.list(data[3])));
        console.log("SOLDE: " + (await pi.value(page, data_HTML[5])[2]));
        console.log("VALORISATION: " + (await pi.value(page, data_HTML[5])[0]));
        console.log("LAST_CO: " + (await pi.value(page, data_HTML[5])[1]));
        console.log("");
        */
        
        await file.write("COMPAGNY: " + data[0]);
        await file.write("ID: " + (await pi.value(page, data_HTML[5])[0]));
        await file.write("STAR: " + (await sc.star_count_cl(data_HTML[1])));
        await file.write("HUB: " + (await hb.list(data[3])));
        await file.write("SOLDE: " + (await pi.value(page, data_HTML[5])[3]));
        await file.write("VALORISATION: " + (await pi.value(page, data_HTML[5])[2]));
        await file.write("LAST_CO: " + (await pi.value(page, data_HTML[5])[1]));
        //await file.write();
        
      }
      /*
      console.log("COMPAGNY: " + data[x * 6]);
      console.log("ID: " + (await pi.value(page, data_HTML[x * 6 + 5])[0]));
      console.log("STAR: " + (await sc.star_count_cl(data_HTML[x * 6 + 1])));
      console.log("HUB: " + (await hb.list(data[x * 6 + 3])));
      console.log("SOLDE: " + (await pi.value(page, data_HTML[x * 6 + 5])[2]));
      console.log("VALORISATION: " + (await pi.value(page, data_HTML[x * 6 + 5])[0]));
      console.log("LAST_CO: " + (await pi.value(page, data_HTML[x * 6 + 5])[1]));
      console.log("");
      */
      x++;
    }
    console.log("--");
    console.log("");
    console.log("--");
  }
}
module.exports = { main_member };
