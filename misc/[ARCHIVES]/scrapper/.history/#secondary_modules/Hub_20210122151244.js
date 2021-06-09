async function list(hub) {
  for (i in hub){
    if (hub[i] == "/"){
      hub[i].replace('/' ,'')
    }
  }
  
  return hub
  }
  module.exports = { list };
  