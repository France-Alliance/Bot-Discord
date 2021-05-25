async function prelaunch_test (page){
    
    console.log("launching test")
    try {
        test = await page.evaluate(() => {
            return document.querySelector('div[title="Trésorerie structurelle à J-1"]').querySelector("span").textContent.trim();
        });
        console.log("Trésorerie structurelle à J-1: ",test)
        console.log("test is good");
      }
      catch(err) {
        console.log("test is not good:\n", err);
      }

}

module.exports = {prelaunch_test}