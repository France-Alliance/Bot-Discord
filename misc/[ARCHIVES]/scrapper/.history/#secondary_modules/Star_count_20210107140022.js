async function star_count(page) {
var i=0
while (true){
    
    try {
        console.log(i)
        var is=i.toString();
        startsystem = await page.evaluate(() => {
          return document
            .querySelector(`div[id="star`+is+`"]`)
            .getAttribute("class")
            //.textContent.trim();
        });
        console.log("star: ", startsystem);
        //console.log("startsystem is good");
        i=i+1
      } catch (err) {
        console.log("Error:\n",err);
        break
      }
    } 
 
}

module.exports = { star_count };
