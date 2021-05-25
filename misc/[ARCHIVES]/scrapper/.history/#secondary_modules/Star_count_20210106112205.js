async function star_count(page) {
  try {
    startsystem = await page.evaluate(() => {
      return document
        .querySelector(`p[id="profileName"]`)
        .querySelector("span")
        .textContent.trim();
    });
    console.log("startsystem: ", startsystem);
    //console.log("startsystem is good");
  } catch (err) {
    console.log("Error: ",\n err);
  }
}

module.exports = { star_count };
