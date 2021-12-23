path_prefix="."

const launch = require(`${path_prefix}/functions/Startup`);
const update = require(`${path_prefix}/functions/Update`);
const flux = require(`${path_prefix}/functions/Userflux`);
const dtfd = require(`${path_prefix}/functions/Datafeed`);
const time = require(`${path_prefix}/functions/Time`);
const ip = require(`${path_prefix}/functions/IP`);

module.exports={launch,update,flux,dtfd,time,ip}