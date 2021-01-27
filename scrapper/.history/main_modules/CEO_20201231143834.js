async function main_ceo (page){

    // Example & Test |Structural solde @ D-1|
    console.log("launching test")
    test = await page.evaluate(() => {
        return document.querySelector('div[title="Trésorerie structurelle à J-1"]').querySelector("span").textContent.trim();
    });
    console.log("Trésorerie structurelle à J-1: ",test);

}

module.exports = {main_ceo}