async function star_count(page) {
  async function ite(i) {
    const is = i.toString();
    console.log("i string: ",is)
    try {
      console.log("i string2: ",is)
      startsystem = await page.evaluate(() => {
        console.log("i string3: ",is)
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
  await page.exposeFunction(`launch`,{

  });
  var liste = [];

  var i = 0;
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
