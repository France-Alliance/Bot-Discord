const { networkInterfaces } = require("os");
const nets = networkInterfaces();

function IPL() {
  /*
  console.log(`Local_IPL: ${nets["Wi-Fi"][1]["address"]}`);
  return nets["Wi-Fi"][1]["address"];
  */
  try {
    //console.log(`Local_IPL: `, nets["Wi-Fi"][1]["address"]);
    return nets["Wi-Fi"][1]["address"];
  } catch (error) {
    //console.error(error);
    console.log("IPL windows mode has failed");
    console.log("Trying IPL Raspberry Pi mode");
    console.log(`Local_IPL: `, nets["wlan0"][0]["address"]);
    console.log("--");
    return nets["wlan0"][0]["address"];
  }
}

function MAC() {
  /*
  console.log(`Local_IPL: `, nets["Wi-Fi"][1]["mac"]);
  return nets["Wi-Fi"][1]["mac"];
  */
  try {
    //console.log(`Local_IPL: `, nets["Wi-Fi"][1]["mac"]);
    return nets["Wi-Fi"][1]["mac"];
  } catch (error) {
    //console.error(error);
    console.log("MAC windows mode has failed");
    console.log("Trying MAC Raspberry Pi mode");
    console.log(`MAC: `, nets["wlan0"][0]["mac"]);
    console.log("--");
    return nets["wlan0"][0]["mac"];
  }
}

/*
function IPL() {
  console.log(`Local_IPL: ${nets["Wi-Fi"][1]["address"]}`)
  return nets["Wi-Fi"][1]["address"]
}

function MAC() {
  console.log(`Local_IPL: `, nets["wlan0"][0]["mac"])
  return nets["wlan0"][0]["mac"]
}

try {
    console.log(`Local_IPL: `, nets["Wi-Fi"][1]["mac"]);
    return nets["Wi-Fi"][1]["mac"];
} catch (error) {
  console.error(error);
  console.log("Windows mode has failed")
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
  try {
    console.log(`Local_IPL: `, nets["wlan0"][0]["mac"])
    return nets["wlan0"][0]["mac"]
  } catch (error) {
  console.error(error);
  console.log("Raspberry mode has failed")
  }
}
*/

module.exports = { IPL, MAC };
