async function star_count(page) {
  try {
    startsystem = await page.evaluate(() => {
      return document
        .querySelector(`div[id="star1"]`)
        .getAttribute("class")
        //.textContent.trim();
    });
    console.log("star: ", startsystem);
    //console.log("startsystem is good");
  } catch (err) {
    console.log("Error:\n",err);
  }
}

module.exports = { star_count };
