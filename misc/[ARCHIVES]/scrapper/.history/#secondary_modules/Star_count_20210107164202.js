async function star_count(page) {
  async function ite(fi) {
    
    try {
      startsystem = await page.$(path).getAttribute("class")//.textContent.trim();
      console.log("star: ", startsystem);
      //console.log("startsystem is good");

    } catch (err) {
      console.log("Error:\n", err);
      return "err"
    }
    
  }

  var liste = [];

  var i = 1;

  while (true){
    await ite(i).then((ite) => {
      if (ite != "err"){
        console.log("i: ",i);
        //liste.append(ite)
      } else {
        console.log("break")
        //break
      }
      i+=1
    })
  }
  //console.log(liste)
}
module.exports = { star_count };
