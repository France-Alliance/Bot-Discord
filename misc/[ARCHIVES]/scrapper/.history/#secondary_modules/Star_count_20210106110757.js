async function star_count (page){ 
    try {
        startsystem = await page.evaluate(() => {
            return document.querySelectorAll('#star1')
        });
        console.log("startsystem: ",startsystem)
        //console.log("startsystem is good");
      }
      catch(err) {
        console.log("Error: ",err);
      }
}

module.exports = {star_count}