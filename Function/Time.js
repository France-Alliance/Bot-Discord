
function year(){
    var dateYServer = new Date().getFullYear();
    return dateYServer
}

function month(){
    var dateMServer = new Date().getMonth();
    return dateMServer
}

function date(){
    var dateDServer = new Date().getDate();
    return dateDServer
}

function hours(){
    var timeHServer = new Date().getHours();
    return timeHServer
}

function minutes(){
    var timeMServer = new Date().getMinutes();
    return timeMServer
}

function secondes(){
    var timeSServer = new Date().getSeconds();

    return timeSServer
}

module.exports = {year, month, date, hours, minutes, secondes}