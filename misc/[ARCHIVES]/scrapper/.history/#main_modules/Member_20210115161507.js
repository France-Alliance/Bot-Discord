const sc = require(`../#secondary_modules/Star_count`)
async function main_member (page){
    await sc.star_count_mb(page);
    //console.log("")
}


module.exports = {main_member}