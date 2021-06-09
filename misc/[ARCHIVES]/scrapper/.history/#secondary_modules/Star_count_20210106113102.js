async function star_count(page) {

async function star_it(i){

    try {
        startsystem = await page.evaluate(() => {
          return document
            .querySelector(`div[id="star1"]`)
            .getAttribute("class")
            //.textContent.trim();
        });
        console.log("star: ", startsystem);
        //console.log("startsystem is good");
        star_it();
      } catch (err) {
        console.log("Error:\n",err);
      }
    } 
    i=i+1
i=1
star_it()
}

module.exports = { star_count };
