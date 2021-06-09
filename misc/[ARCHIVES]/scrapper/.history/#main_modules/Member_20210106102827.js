async function main_member (page){

    console.log("launching test")
    try {
        startsystem = await page.evaluate(() => {
            return document.querySelectorAll('.starSystem')
        });
        console.log("startsystem: ",startsystem)
        //console.log("startsystem is good");
      }
      catch(err) {
        console.log("Error: ", err);
      }
}

module.exports = {main_member}