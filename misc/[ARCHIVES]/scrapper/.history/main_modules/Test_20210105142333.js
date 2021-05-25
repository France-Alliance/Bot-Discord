async function prelaunch_test (page){
    
    console.log("launching test")
    try {
        var_data = await page.evaluate(() => {
            return document.querySelector('div[title="Trésorerie structurelle à J-1"]').querySelector("span").textContent.trim();
        });
        var = await page.evaluate(() => {
          return document.querySelector('div[title="Trésorerie structurelle à J-1"]').querySelector("span").textContent.trim();
      });

        console.log(var_data)
        console.log("test is good");
      }
      catch(err) {
        console.log("test is not good:\n", err);
      }

}

module.exports = {prelaunch_test}