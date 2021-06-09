const sc = require(`./#secondary_modules/star_count`).star_count();
async function main_member (page){

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


module.exports = {main_member}