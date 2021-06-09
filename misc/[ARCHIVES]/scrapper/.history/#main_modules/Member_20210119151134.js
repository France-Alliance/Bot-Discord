const sc = require(`../#secondary_modules/Star_count`)
const id = require(`../data/IDs.json`)

async function main_member (page){
    await sc.star_count_mb(page);
    //console.log("")
    for (i in id){
        console.log(id[i])
    }
    //await sc.star_count_sel(page, )
}
module.exports = {main_member}