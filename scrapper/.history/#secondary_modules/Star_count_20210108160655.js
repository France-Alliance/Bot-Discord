async function star_count(page) {
  async function ite(path) {
    try {
      startsystem = await page.$(path)
      console.log(listerToutesLesPropriétés(startsystem))
      //.textContent.trim();
      console.log("startsystem: ",typeof(startsystem))
      startsystem().then((value) => {
        console.log("startsystem: ",value)
      });
      //console.log("startsystem is good");
    } catch (err) {
      console.log("Error:\n", err);
      return "err";
    }
  }

  function listerToutesLesPropriétés(o){
    var objectToInspect;
    var result = [];
  
    for(objectToInspect = o;
        objectToInspect !== null;
        objectToInspect = Object.getPrototypeOf(objectToInspect)){
      result = result.concat(Object.getOwnPropertyNames(objectToInspect));
    }
    return result;
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
