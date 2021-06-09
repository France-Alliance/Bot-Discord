async function list(hub) {
  hub=hub.replace(/\//g ,'')
  hub=hub.trim().split(/ +/g);
  hub=hub.replace(/\r?\n/g ,' ')
  
  return hub
  }
  module.exports = { list };
  