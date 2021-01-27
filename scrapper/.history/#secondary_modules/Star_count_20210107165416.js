async function star_count(page) {
    async function ite(path) {
    try {
      startsystem = await page.$(path).getAttribute("class")//.textContent.trim();
      console.log("star: ", startsystem);
      //console.log("startsystem is good");

    } catch (err) {
      console.log("Error:\n", err);
      return "err"
    } 
  } 

  while (i <= 4 ){
    path_num=i+1
    path=`div[id="star`+ path_num  +`"]`
    await ite(path)
  }
}
module.exports = { star_count };
