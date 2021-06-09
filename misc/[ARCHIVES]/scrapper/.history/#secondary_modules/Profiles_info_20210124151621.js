async function value(page, html){
    values=[]
    html=html.replace('<a href="/company/profile/airline/','')
    html=html.replace('"><img src="/images/icons20/profil.png?v1.6.11" title="Profil de la compagnie"></a>','')
    html=html.trim()
    await page.goto(
        `https://www.airlines-manager.com/company/profile/airline/` + html
    );
    await page.waitForSelector(".dashMachine > .bold");
    bold = await page.$$eval(".dashMachine>.bold", e=>e.map((a)=>a.innerText))
    //await page.$$eval('h1 > a', e=>e.map((a)=>a.href))
    //console.log("VALORISATION: "+bold[1])
    //console.log("SOLDE: "+bold[3])
    //console.log("LAST_CO: "+bold[2])
    //console.log('ID: '+html)
    return {
        html,
        bold[2],
        bold[1],
        bold[3]}
    //console.log('value: '+value)
}

module.exports = {value}