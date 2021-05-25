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
        const data_HTML = await page.evaluate(() => {
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
            console.log("");
            console.log('ALLIANCE: '+a)
            if (x === 1) {
                console.log("COMPAGNY: " + data[0]);
                console.log("STAR: " + await sc.star_count_cl(data_HTML[1]));
                console.log("HUB: " + await hb.list(data[3]));
                console.log("");
            }
            console.log("COMPAGNY: " + data[x * 6]);
            console.log("STAR: " + await sc.star_count_cl(data_HTML[x * 6 + 1]));
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

