const Command = require('./Command');

module.exports = class Meet extends Command {
    static match(message) {
        let retour;
        console.log(`<${Date()}> : Recieved Message to ${message.author.id}, content ${message.content}`);
    }
}


var argsc = message.content.split(" ");
var timeHServer = new Date().getHours();
var timeMServer = new Date().getMinutes();
var timeSServer = new Date().getSeconds();
message.channel.send(`Heure du serveur : ${timeHServer}:${timeMServer}:${timeSServer}`);

if (argsc[1] === "start") {
    var SMeet = new Date().getTime();
    var SMeetD = new Date().getHours();

    Meet.push([SMeet, argsc[2], null])

    message.channel.send(`Vous commencez une réunion nommée ${argsc[2]} à ${SMeetD}h, bon bah bonne réunion ;)`);
};

if (argsc[1] === "list") {

    if (Meet.length != 0) {
        message.channel.send(`Il y a ${Meet.length} réunion en cours`);
    } else {
        message.channel.send(`Auncune réunion est enregistré`);
    };

};

if (argsc[1] === "search") {

    if (Meet.length != 0) {
        for (let index = 0; index < Meet.length; index++) {
            const meet = Meet[index];
            var SMeet = null;
            SMeet = meet.indexOf(argsc[2]);

            console.log(SMeet);
            if (SMeet != null) {
                var SMeetH = new Date(meet[0]).getHours();
                var SMeetM = new Date(meet[0]).getMinutes();
                var SMeetS = new Date(meet[0]).getSeconds();

                message.channel.send(`Il ya bien une réunion au nom de ${argsc[2]} qui à commencé à ${SMeetH}:${SMeetM}:${SMeetS}`);
            };
        };
    } else {
        message.channel.send(`Auncune réunion à ce nom : ${argsc[2]}`);
    };

};

if (argsc[1] === "end") {
    var FMeet = new Date().getTime();
    var FMeetD = new Date().getHours();

    if (Meet.length != 0) {
        for (let index = 0; index < Meet.length; index++) {
            const meet = Meet[index];

            if (meet[1] === argsc[2]) {
                var duree = FMeet - meet[0]
                duree = new Date(duree).getMinutes();
                message.channel.send(`Vous finissez votre réunion nommée ${argsc[2]} de ${duree}min à cette heure-là ${FMeetD}h !`);
                Meet.splice(index, 1);
            };

            if (meet[1] != argsc[2]) {
                message.channel.send(`Auncune réunion à ce nom : ${argsc[2]}`);
            };
        };
    } else {
        message.channel.send(`Auncune réunion est enregistré`);
    };

};