async function main_member (page){

    console.log("launching test")
    try {
        test = await page.evaluate(() => {
            return document.querySelector('.starSystem').querySelectorAll("span").textContent.trim();
        });
        console.log("Trésorerie structurelle à J-1 :",test)
        console.log("test is good");
      }
      catch(err) {
        console.log("test is not good: ", err);
      }
}

module.exports = {main_member}