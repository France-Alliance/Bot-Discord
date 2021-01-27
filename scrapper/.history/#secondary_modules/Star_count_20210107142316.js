async function star_count(page) {
  async function ite(i) {
    const is = i.toString();
    console.log("i string: ",is)
    try {

      startsystem = await page.evaluate(() => {
        return document
          .querySelector(`div[id="star` + is + `"]`)
          .getAttribute("class");
        //.textContent.trim();
      });
      console.log("star: ", startsystem);
      //console.log("startsystem is good");
      i = i + 1;
    } catch (err) {
      console.log("Error:\n", err);
      return "err"
    }
  }
  var i = 0;
  var liste = []


  while (true){
    ite = await ite(i)
    if (await ite != "err"){
      
      console.log("i: ",i);
      liste.append(await ite)
    } else {
      break
    }
    i+=1
  }
  console.log(liste)

}

module.exports = { star_count };
