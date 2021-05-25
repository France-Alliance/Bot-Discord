const sc = require(`../#secondary_modules/Star_count`)
const id = require(`../data/IDs.json`)


async function main_member (page){
    await sc.star_count_mb(page);
    //console.log("")
    for (i in id){
        await page.goto(`https://www.airlines-manager.com/alliance/members/`+id[i].toString());
        const AML = await page.$eval(`#allianceMembersList`, (el) => el)
        const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('#allianceMembersList > tbody tr td'))
        return tds.map(td => td.innerText)
        });
    
        //You will now have an array of strings
        //[ 'One', 'Two', 'Three', 'Four' ]
        x=1
        while(x < (data.length/6)+1){
            console.log('x: '+x)
            if (x === 1){
                console.log('x: 1, data[3] ')
                console.log(data[3]);
            }
            console.log('data[('+x+'*6)-1]')
            console.log(data[(x*6)-1]);
            x++
        }
        console.log("--");
        console.log("");
        console.log("--");
        console.log(data);
        //console.log("AML: "+AML)
        console.log("data.length/6: "+data.length/6)
    }
    
    //await sc.star_count_sel(page, )
}
module.exports = {main_member}
/*
'Nice Clouds',
'    ',
'Darzzake',
'DRW/ \nVIE/ \nDFW/ \nNCE/ \n',
'Bras droit',
'',
'Air Meridian',
'    ',
'Diajerz',
'PEK/ \nLAX/ \nVIE/ \n',
'',
'',
'Skarface Airlines',
'    ',
'Skatface',
'GVA/ \nDXB/ \nLAX/ \nSMR/ \nZRH/ \n',
'Directeur Commercial',
'',
'Glenn Airliners',
'    ',
'Glenn',
'ICN/ \nLBV/ \nLYS/ \n',
'Fondateur',
'',
'Air_France_Cygnus',
'    ',
'Matthieu_1434623',
'LAX/ \nCDG/ \n',
'Directeur Ressources Humaines',
'',
"Dutch Air'ways",
'    ',
'Sam',
'AMS/ \n',
'Directeur Marketing',
'',
'France air_2429257',
'    ',
'Charles',
'CDG/ \n',
'',
'',
'Makwa Air',
'    ',
'Makwa07',
'DXB/ \nDEN/ \n',
'',
'',
'Fulmetal',
'    ',
'Axel Ardan',
'DEN/ \nBNE/ \nGRU/ \nNGO/ \nNTE/ \n',
'Bras droit',
'',
'Air France_4261063',
'    ',
'James',
'ATL/ \nCDG/ \n',
'',
'',
'Air_Québec_One',
'    ',
'Mr Sous-Collines',
'YUL/ \n',
'',
'',
'Air France Yamaha',
'    ',
'Staniswag',
'CDG/ \n',
'',
'',
'Air frace klm',
'    ',
'Stef bou',
'MEX/ \nCDG/ \n',
'',
  ''
*/