const sc = require(`../#secondary_modules/Star_count`);
const hb = require(`../#secondary_modules/Hub`);
const id = require(`../data/IDs.json`);

async function main_member(page) {
    await sc.star_count_mb(page);
    for (i in id) {
        await page.goto(
            `https://www.airlines-manager.com/alliance/members/` + id[i].toString()
        );
        const data = await page.evaluate(() => {
            const tds = Array.from(
                document.querySelectorAll("#allianceMembersList > tbody tr td")
            );
            return tds.map((td) => td.innerText);
        });
        const data_star = await page.evaluate(() => {
            const tds = Array.from(
                document.querySelectorAll("#allianceMembersList > tbody tr td")
            );
            return tds.map((td) => td.innerHTML);
        });
        
        console.log("--");
        console.log("");
        const a=i
        x = 1;
        while (x < data.length / 6) {
            //console.log("x: " + x);
            console.log("");
            console.log('ALLIANCE: '+a)
            if (x === 1) {
                console.log("COMPAGNY: " + data[0]);
                console.log("STAR: " + await sc.star_count_cl(data_star[1]));
                console.log("HUB: " + await hb.list(data[3]));
                console.log("");
            }
            console.log("COMPAGNY: " + data[x * 6]);
            console.log("STAR: " + await sc.star_count_cl(data_star[x * 6 + 1]));
            console.log("HUB: " + await hb.list(data[x * 6 + 3]));
            console.log("");
            x++;
        }
        console.log("--");
        console.log("");
        console.log("--");
    }
}
module.exports = { main_member };
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
