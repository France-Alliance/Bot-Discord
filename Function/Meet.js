const Command = require('./Command');

module.exports = class Meet extends Command {
    static match(message, prefix, db) {
        let retour;
        console.log(`<${Date()}> :`, `Recieved Message to ${message.author.id}, content ${message.content}`);
        if (message.content.startsWith(prefix + 'Meet') || message.content.startsWith(prefix + 'meet')) {
            retour = true;
            this.action(message, prefix, db);
        } else {
            retour = false;
            return message.content.startsWith(prefix + 'Meet') || message.content.startsWith(prefix + 'meet');
        };
    };

    static action(message, prefix, db) {
        var argsc = message.content.split(" ");
        var timeHServer = new Date().getHours();
        var timeMServer = new Date().getMinutes();
        var timeSServer = new Date().getSeconds();
        var timeFServer = `${timeHServer}:${timeMServer}:${timeSServer}`;
        message.channel.send(`Heure du serveur : ${timeFServer}`);

        if (argsc[1] === "start") {
            var SMeet = new Date().getTime();
            var SMeetD = new Date().getHours();
            console.log(argsc);

            db.run(`INSERT into meet (owner, name, HeureStart, HeureEnd) VALUES ('${message.author.username}', '${argsc[2]}',${SMeet}, False)`, (err) => {
                if (err) {
                    console.error('Error : ', err);
                };
            });

            message.channel.send(`Vous commencez une réunion nommée ${argsc[2]} à ${SMeetD}h crée par ${message.author.username}, bon bah bonne réunion ;)`);
        };

        if (argsc[1] === "list") {

            let sql = `SELECT * FROM meet`;

            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Error : ', err);
                };

                var meet = [];

                rows.forEach((row) => {
                    if (row.HeureEnd != 0) {
                        meet.push([row.owner, row.Name, row.HeureStart]);
                    };
                });

                message.channel.send('Voici la liste des réunion en cours :');
                meet.forEach((data) => {
                    console.log(data);
                    var TimeStamp = new Date(data[2]).getTime();
                    console.log(TimeStamp);
                    var Heure = new Date(data[2]).getHours();
                    var Min = new Date(data[2]).getMinutes();
                    var Sec = new Date(data[2]).getSeconds();
                    var Time = `${Heure}:${Min}:${Sec}`;

                    message.channel.send(` - Name ${data[1]}, Start Time : ${Time}, Owner : ${data[0]}`);
                });
            });

        };

        if (argsc[1] === "search") {
            /*
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
            */

            let sql = `SELECT * FROM meet WHERE Name='${argsc[2]}'`;

            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Error : ', err);
                };

                message.channel.send('Voici la liste des personne ayant enregistré leurs anniversaire et qui correspond à votre recherche :');
                rows.forEach((name) => {
                    message.guild.members.cache.forEach((iddb) => {
                        if (name.PlayerID === iddb.id) {
                            message.channel.send(` - ${iddb.user} (${name.Date})`);
                        };
                    });
                });
            });

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
    };
};