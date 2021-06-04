async function star_count (page){

    console.log("")
    try {
        startsystem = await page.evaluate(() => {
            return document.querySelectorAll('.starSystem')
        });
        console.log("startsystem: ",startsystem)
        //console.log("startsystem is good");
      }
      catch(err) {
        console.log("Error: ",err);
      }
    console.log("")
}

module.exports = star_count}