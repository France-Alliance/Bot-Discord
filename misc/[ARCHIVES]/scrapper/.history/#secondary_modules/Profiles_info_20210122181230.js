async function value(page, html){
    values=[]
    html=html.replace('<a href="','')
    html=html.replace('"><img src="/images/icons20/profil.png?v1.6.11" title="Profil de la compagnie"></a>','')
    html=html.trim()
    console.log('html: '+html)
    await page.goto(
        `https://www.airlines-manager.com` + html
    );
    await page.waitForSelector(".dashMachine > .bold");
    bold=await page.$$eval(".dashMachine>.bold", e=>e.map((a)=>a.innerText))
    //await page.$$eval('h1 > a', e=>e.map((a)=>a.href))
    console.log("Valorisation: "+bold[1])
    console.log("Solde: "+bold[3])
    console.log("Dernière connection: "+bold[0])

    //console.log('value: '+value)
}

module.exports = {value}