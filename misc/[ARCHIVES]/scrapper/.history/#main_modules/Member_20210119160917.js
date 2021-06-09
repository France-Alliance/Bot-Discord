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
        return tds.map(td => td.innerHTML)
        });
    
        //You will now have an array of strings
        //[ 'One', 'Two', 'Three', 'Four' ]
        //x=1
        //while()
        console.log("--");
        console.log("");
        console.log("--");
        console.log(data);
        //console.log("AML: "+AML)
        console.log("data.length/6: "+data.length/8)
    }
    
    //await sc.star_count_sel(page, )
}
module.exports = {main_member}