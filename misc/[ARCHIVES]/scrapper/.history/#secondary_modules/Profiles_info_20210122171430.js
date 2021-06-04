async function value(html){
    console.log('html: '+html)
    html=html.replace('<a href="','')
    html=html.replace('"><img src="/images/icons20/profil.png?v1.6.11" title="Profil de la compagnie"></a>','')
    console.log('html: '+html)
}

module.exports = {value}