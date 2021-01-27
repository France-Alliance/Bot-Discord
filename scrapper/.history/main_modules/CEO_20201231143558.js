function main_ceo (page){
    // Example |Structural solde @ D-1|
    title = await page.evaluate(() => {
        return document.querySelector('div[title="Trésorerie structurelle à J-1"]').querySelector("span").textContent.trim();
    });
    console.log("Trésorerie structurelle à J-1: ",title);

}

module.exports = {main_ceo}