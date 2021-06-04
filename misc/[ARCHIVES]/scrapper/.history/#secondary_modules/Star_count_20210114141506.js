async function star_count(page) {
  async function ite(numb) {
    try {
      //startsystem = await page.$(numb)
      //console.log("propriétés: ",listerToutesLesPropriétés(startsystem))
      //console.log("typeof startsystem: ",typeof(startsystem))
      //console.log("startsystem: ", startsystem)
      //console.log("startsystem is good");
      console.log("class of star: ", await page.$eval(`#star${numb}`, el => el))
    } catch (err) {
      console.log("Error:\n", err);
      return "err";
    }
  }

  i = 1;
  while (i <= 5) {
    path = `div[id="star` + i.toString() + `"]`;
    console.log("");
    console.log("path: ", path);
    console.log("typeof(path): ", typeof path);
    await ite(i);
    console.log("--");
    i += 1;
  }
}
module.exports = { star_count };
