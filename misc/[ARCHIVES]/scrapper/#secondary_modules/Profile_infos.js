const file = require(`./File`);

async function value(page, html){
    html=html.replace('<a href="/company/profile/airline/','')
    html=html.replace('"><img src="/images/icons20/profil.png?v1.6.11" title="Profil de la compagnie"></a>','')
    html=html.trim()
    await page.goto(
        `https://www.airlines-manager.com/company/profile/airline/` + html
    );
    await page.waitForSelector(".dashMachine > .bold");
    bold = await page.$$eval(".dashMachine>.bold", e=>e.map((a)=>a.innerText))

    /*

    console.log("VALORISATION: "+bold[1])
    console.log("SOLDE: "+bold[3])
    console.log("LAST_CO: "+bold[2])
    console.log('ID: '+html)

    await file.write("VALORISATION: "+bold[1])
    await file.write("SOLDE: "+bold[3])
    await file.write("LAST_CO: "+bold[2])
    await file.write('ID: '+html)

    */

    return [bold, html]
}

module.exports = {value}