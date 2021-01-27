async function star_count(page) {
i=0
while (true){
    
    try {
        startsystem = await page.evaluate(() => {
          return document
            .querySelector(`div[id="star${i}"]`)
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
