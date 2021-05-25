path = require("path");

ss = require("../#secondary_modules/Screenshot");
file = require(`../#secondary_modules/File`);

df = path.join(__dirname, "../", `output/datasheet/`);
ws = path.join(__dirname, "../","data/Datasheet_visualizer.html");

async function tss(page) {
  await page.setDefaultNavigationTimeout(0);
  date_ob = new Date();
  date = ("0" + date_ob.getDate()).slice(-2);
  month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  year = date_ob.getFullYear();
  i = 0;

  file.folder(df);

  while (i < 6) {
    file_name = `${date}-${month}-${year} | ${i}.jgp`;
    await page.keyboard.press("ArrowRight");
    await page.goto(ws);
    await page.waitForTimeout(5000)
    console.log("loaded");
    await page.screenshot({ path: df + file_name, type: "jpeg" });
    console.log("took a screenshot: " + file_name);
    i++;
  }
}

module.exports = { tss };
