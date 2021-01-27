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
    return await page.$$eval(".bold", (el) => {console.log('el: '+el)})
    //console.log("bold: "+bold)
    //console.log('value: '+value)
}

module.exports = {value}