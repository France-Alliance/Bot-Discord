async function star_count(page) {
  async function ite(i) {
    const is = i.toString();
    console.log("i string: ",is)
    console.log(`div[id="star` + is + `"]`)
    try {
      startsystem = await page.evaluate((is) => {
        return document
          .querySelector(`div[id="star1"]`)
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

  var liste = [];

  var i = 1;
  console.log("i: ",i);

  while (true){
    ite = await ite(i)
    if (ite != "err"){
      
      console.log("i: ",i);
      liste.append(ite)
    } else {
      break
    }
    i+=1
  }
  console.log(liste)

}

module.exports = { star_count };
