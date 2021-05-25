const sc = require(`../#secondary_modules/Star_count`)
async function main_member (page){
    console.log("")
    await sc.star_count(page);
    console.log("")
}


module.exports = {main_member}