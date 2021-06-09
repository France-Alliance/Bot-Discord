function year() {
    var dateYServer = new Date().getFullYear();
    return dateYServer
}

function month() {
    var dateMServer = `${(new Date().getMonth() + 1)}`;
    if (dateMServer.length === 1) {
        return `0${dateMServer}`
    } else {
        return dateMServer;
    };
}

function date() {
    var dateDServer = `${new Date().getDate()}`;
    if (dateDServer.length === 1) {
        return `0${dateDServer}`
    } else {
        return dateDServer;
    };
}

function hours() {
    var timeHServer = new Date().getHours();
    return timeHServer
}

function minutes() {
    var timeMServer = new Date().getMinutes();
    return timeMServer
}

function secondes() {
    var timeSServer = new Date().getSeconds();

    return timeSServer
}

module.exports = { year, month, date, hours, minutes, secondes }