async function star_count(page) {
  async function ite(path) {
    try {
      //startsystem = await page.$(path)
      //console.log("propriétés: ",listerToutesLesPropriétés(startsystem))
      //console.log("typeof startsystem: ",typeof(startsystem))
      //console.log("startsystem: ", startsystem)
      //console.log("startsystem is good");
      console.log("class of star: ", await page.$eval(path)).then(el => el.getProperty('className')).then(className => {console.log("Class name: ",className)} )
    } catch (err) {
      console.log("Error:\n", err);
      return "err";
    }
  }

  i = 1;
  while (i <= 5) {
    path = `#star` + i.toString()
    console.log("");
    console.log("path: ", path);
    console.log("typeof(path): ", typeof path);
    await ite(path);
    console.log("--");
    i += 1;
  }
}
module.exports = { star_count };
