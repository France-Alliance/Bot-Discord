async function list(hub) {
  hub=hub.replace(/\//g ,'')
  hub=hub.trim().split(/ +/g);
  return hub
  }
  module.exports = { list };
  