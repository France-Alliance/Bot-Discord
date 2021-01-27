async function prelaunch_test(page) {
  console.log("launching test");
  try {
    div_data = await page.evaluate(() => {
      return document
        .querySelector('div[title="Trésorerie structurelle à J-1"]')
        .querySelector("span")
        .textContent.trim();
    });

    div = await page.evaluate(() => {
      return document
        .querySelector('div[title="Trésorerie structurelle à J-1"]')
        .textContent();
    });

    console.log(div + div_data);
    console.log("test is good");
  } catch (err) {
    console.log("test is not good:\n", err);
  }
}

module.exports = { prelaunch_test };
