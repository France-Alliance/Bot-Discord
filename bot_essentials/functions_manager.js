path_prefix="."

const launch = require(`${path_prefix}/functions/Startup`);
const update = require(`${path_prefix}/functions/Update`);
const flux = require(`${path_prefix}/functions/Userflux`);
const time = require(`${path_prefix}/functions/Time`);
const ip = require(`${path_prefix}/functions/IP`);


module.exports={launch,update,flux,time,ip}