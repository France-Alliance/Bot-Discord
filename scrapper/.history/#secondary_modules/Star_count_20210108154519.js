async function star_count(page) {
  async function ite(path) {
    try {
      startsystem = await page.$(path)
      //.textContent.trim();
      console.log("startsystem: ",startsystem)
      startsystem().then((value) => {
        console.log("startsystem: ",value)
      });
      //console.log("startsystem is good");
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
    await ite(path);
    console.log("--");
    i += 1;
  }
}
module.exports = { star_count };