async function star_count (page){ 
    try {
        startsystem = await page.evaluate(() => {
            return document.querySelector('#profileName')
        });
        console.log("startsystem: ",startsystem)
        //console.log("startsystem is good");
      }
      catch(err) {
        console.log("Error: ",err);
      }
}

module.exports = {star_count}