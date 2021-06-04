async function list(hub) {
  const search = '/'  
  const replacer = new RegExp(search, 'g')
  hub.replace(replacer ,'')
  return hub
  }
  module.exports = { list };
  