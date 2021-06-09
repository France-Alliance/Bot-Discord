async function star_count(page) {
  async function ite(i) {
    try {
      var is = i.toString();
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
      break;
    }
  }
  var i = 0;
  var liste = []


  while (ite(i)){

    if (ite(i) != "err"){
      i+=1
      console.log(i);
      liste.append(ite(i))
    } else {
      break
    }
  }
  console.log(liste)

}

module.exports = { star_count };
