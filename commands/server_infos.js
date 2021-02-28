module.exports = {
  name: "server_infos",
  description: "Ping!",
  execute(message, args) {
    // unix timestamp
    var ts = message.guild.createdTimestamp;

    // initialize new Date object
    var date_ob = new Date(ts);

    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear();

    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2);

    // hours as 2 digits (hh)
    var hours = ("0" + date_ob.getHours()).slice(-2);

    // minutes as 2 digits (mm)
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // seconds as 2 digits (ss)
    var seconds = ("0" + date_ob.getSeconds()).slice(-2);

    var dte =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    message.channel.send(
      ` ${message.guild.name}: ${
        message.guild.memberCount
      } total members\rServer Region: ${message.guild.region}\rOwner: ${
        message.guild.owner
      }\rCreated: ${dte}\rServer Icon: ${message.guild.iconURL(
        "jpg",
        true,
        2048
      )}`
    );
  },
};
