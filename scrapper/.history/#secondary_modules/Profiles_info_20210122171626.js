async function value(html){
    html=html.replace('<a href="','')
    html=html.replace('"><img src="/images/icons20/profil.png?v1.6.11" title="Profil de la compagnie"></a>','')
    html=html.trim()
    console.log('html: '+html)
    await page.goto(
        `https://www.airlines-manager.com` + html
    );
}

module.exports = {value}