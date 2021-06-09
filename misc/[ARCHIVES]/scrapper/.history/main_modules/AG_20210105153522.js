async function main_AG (page){
    
    console.log("launching test")
    try {
        test = await page.evaluate(() => {
            return document.querySelector('div[title="Trésorerie structurelle à J-1"]').querySelector("span").textContent.trim();
        });
        console
        console.log("test is good");
      }
      catch(err) {
        console.log("test is not good:\n", err);
      }


}

module.exports = {main_AG}