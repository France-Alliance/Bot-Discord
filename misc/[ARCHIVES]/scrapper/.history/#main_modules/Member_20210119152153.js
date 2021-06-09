const sc = require(`../#secondary_modules/Star_count`)
const id = require(`../data/IDs.json`)


async function main_member (page){
    await sc.star_count_mb(page);
    //console.log("")
    for (i in id){
        await page.goto(`https://www.airlines-manager.com/alliance/members/`+id[i].toString());
        const AML = await page.$eval(`#allianceMembersList`, (el) => el)
        console.log("AML: "+AML)
        
    }
    //await sc.star_count_sel(page, )
}
module.exports = {main_member}