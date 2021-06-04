async function star_count(page) {
  async function ite(path) {
    try {
      //startsystem = await page.$(path)
      //console.log("propriétés: ",listerToutesLesPropriétés(startsystem))
      //console.log("typeof startsystem: ",typeof(startsystem))
      //console.log("startsystem: ", startsystem)
      //console.log("startsystem is good");
      const starclass = await page.$eval(path, el => el.id)
      console.log("class of star: "+starclass)
    } catch (err) {
      console.log("Error:\n"+ err);
      return "err";
    }
  }

  i = 1;
  while (i <= 5) {
    path="#star"+i.toString()
    console.log("");
    console.log("path: "+path);
    console.log("typeof(path): "+typeof(path));
    await ite(path);
    console.log("--");
    i += 1;
  }
}
module.exports = { star_count };
