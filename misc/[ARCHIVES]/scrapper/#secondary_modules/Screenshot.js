var fs = require("fs");
const file = require(`./File`);


async function take(page, dest_folder) {
  await file.folder(dest_folder);
  await page.screenshot({ path: dest_folder, type: "jpeg" });
}

module.exports = { take};
