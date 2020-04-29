const Command = require('./Command');

module.exports = class Anniversaire extends Command {

    static match(message, prefix, db) {
        let retour;
        console.log(`<${Date()}> :`, `Recieved Message to ${message.author.id}, content ${message.content}`);
        if (message.content.startsWith(prefix + 'Anniversaire') || message.content.startsWith(prefix + 'anniversaire')) {
            retour = true;
            this.action(message, prefix, db);
        } else {
            retour = false;
            return message.content.startsWith(prefix + 'Anniversaire') || message.content.startsWith(prefix + 'anniversaire');
        };
    };

    static action(message, prefix, db) {
        var argsc = message.content.split(" ");

        if (argsc[1] === 'add') {
            var author = message.mentions.users;
            var date = argsc[2];

            db.run(`INSERT into anniversaire (PlayerID, Date) VALUES ('${author.map((obj) => { return obj.id; })}', '${date}')`, (err) => {
                if (err) {
                    console.error('Error : ', err);
                };
            });

            message.channel.send(`l'Anniversaire de ${author.map((obj) => { return obj.username; })} a été enregistré (${date})`);
        };

        if (argsc[1] === 'list') {
            let sql = `SELECT * FROM anniversaire`

            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Error : ', err);
                };

                var player = [];

                rows.forEach((row) => {
                    message.guild.members.cache.forEach((iddb) => {
                        if (row.PlayerID === iddb.id) {
                            player.push([iddb.user, row.Date]);
                        };
                    });
                });

                message.channel.send('Voici la liste des personne ayant enregistré leurs anniversaire :');
                player.forEach((name) => {
                    message.channel.send(` - ${name[0]} (${name[1]})`);
                });
            });
        };

        if (argsc[1] === 'search') {
            var author = message.mentions.users;
            var id = author.map((obj) => { return obj.id })

            let sql = `SELECT * FROM anniversaire WHERE PlayerID='${id}'`;

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

        if (argsc[1] === 'remove') {
            var author = message.mentions.users;
            var id = author.map((obj) => { return obj.id; });

            let sql = `DELETE FROM anniversaire WHERE PlayerID='${id}'`;

            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Error : ', err);
                };

                message.channel.send(`L'anniversaire de ${author.map((obj) => { return obj.username; })} à était supprimé !`);
            });
        };
    };

};