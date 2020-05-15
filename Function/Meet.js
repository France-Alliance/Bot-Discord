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
            var SMeetH = new Date().getHours();
            var SMeetM = new Date().getMinutes();
            console.log(argsc);

            db.run(`INSERT into meet (owner, name, HeureStart, HeureEnd) VALUES ('${message.author.id}', '${argsc[2]}', '${SMeetH}:${SMeetM}', False)`, (err) => {
                if (err) {
                    console.error('Error : ', err);
                } else {
                    message.channel.send(`Vous commencez une réunion nommée ${argsc[2]} à ${SMeetH}h crée par ${message.author.username}, bon bah bonne réunion ;)`);
                };
            });
        };

        if (argsc[1] === "list") {

            let sql = 'SELECT * FROM `meet`';

            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Error : ', err);
                };

                message.channel.send('Voici la liste des réunion en cours :');
                rows.forEach((row) => {
                    if (row.HeureEnd != 1) {
                        var Time = row.HeureStart;
                        message.guild.members.cache.forEach((iddb) => {
                            if (row.owner === iddb.id) {
                                message.channel.send(` - Name ${row.Name}, Start Time : ${Time}, Owner : ${iddb.user}`);
                            };
                        });
                    };
                });
            });

        };

        if (argsc[1] === "search") {
            var [id, username] = message.mentions.users.map((obj) => {
                return [obj.id, obj.username];
            });

            console.log(id, username);
            let sql = `SELECT * FROM 'meet' WHERE owner='${id}'`;

            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Error : ', err);
                } else {
                    message.channel.send(`Voici la liste des réunion d'aujourd'hui qui correspond à votre recherche (owner : ${username}) :`);
                    console.log('Rows : ', rows);
                    rows.forEach((row) => {
                        message.guild.members.cache.forEach((iddb) => {
                            if (row.owner === iddb.id && row.HeureStart != 1) {
                                message.channel.send(` - une réunion à ${row.HeureStart} du nom de ${row.Name}`);
                            };
                        });
                    });
                };
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