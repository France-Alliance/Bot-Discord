const date = require(`../functions/Time`);
var { PythonShell } = require('python-shell')
let nameFile, finnish = false;

module.exports = {
    name: "amd",
    description: "Summmon a file with all France Alliance AM2 Data (take ≈ 10mn)",
    aliases: ['am2d'],
    usage: '***Alliance*** : !!amd --Alliance {Name | ID (recommended)} {(Optionel) ID, Classement, Profile, Members, Networks};\r ***Members*** : !!amd --Members {Name | ID (recommended)} {(Optionel) Alliance {Name | ID}} {(Optionel) ID, Name, Star, Owner, Hubs, Role, Valorisation, Solde, LastConnection};\r ***All*** : !!amd --All',
    cooldown: 5,
    execute(message) {
        args = message.content.replace('!!amd ', '')
        console.log(args);
        message.channel.send("Gathering the data...\rPlease wait")

        let pyshell = new PythonShell('NewScrapper/Args.py', { mode: 'text', args: [args] });

        // sends a message to the Python script via stdin
        // pyshell.send('hello');

        pyshell.on('message', function(res) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(res);
            nameFile = res;
        });

        // end the input stream and allow the process to exit
        pyshell.end(function(err, code, signal) {
            if (err) { throw err }
            //console.log('');
            //console.log('The exit code was: ' + code);
            //console.log('The exit signal was: ' + signal);
            //console.log('');
            //console.log('execution of the python script is finished');
            //console.log('sending the file');
            message.reply(
                ` :arrow_right: data of ${date.date()}-${date.month()}-${date.year()} is ready !`, {
                    files: [nameFile, ]
                }
            );
            nameFile = null;
            finnish = true;

            pyshell = new PythonShell('NewScrapper/Utils.py');

            pyshell.on('message', function(res) {
                console.log(res);
            });
            pyshell.end((err, code, signal) => { if (err) { throw err } });
        });


    },
};