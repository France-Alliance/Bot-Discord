const date = require(`../functions/Time`);
const { PythonShell } = require('python-shell');

let nameFile, finnish = false;

module.exports = {
    name: "amd",
    description: "Summmon a file with all France Alliance AM2 Data (take ≈ 10mn)",
    aliases: ['am2d'],
    usage: '***Alliance*** : !!amd --Alliance {Name | ID (recommended)} {(Optionel) ID, Classement, Profile, Members, Networks};\r ***Members*** : !!amd --Members {Name | ID (recommended)} {(Optionel) Alliance {Name | ID}} {(Optionel) ID, Name, Star, Owner, Hubs, Role, Valorisation, Solde, LastConnection};\r ***All*** : !!amd --All',
    cooldown: 5,
    execute(message) {
    	message.content = message.content.replace('!!am2d ', '!!amd ')
        args = message.content.replace('!!amd ', '')
        console.log(args);
        message.channel.send("Gathering the data...\rPlease wait")

        let pyshell = new PythonShell('NewScrapper/Args.py', { mode: 'text', args: [args] });

        pyshell.on('message',  res => {
            console.log("File Name : " + res);
            nameFile = res.replace("File Name : ", "");
        });



        pyshell.end((err, code, signal) => {
            if (err) { throw err }
            message.reply(
                ` :arrow_right: data of ${date.date()}-${date.month()}-${date.year()} is ready !`, {
                    files: [{attachment: nameFile, name: nameFile.split("/")[nameFile.split("/").length - 1]}]
                }
            );
            
            nameFile = null;
            finnish = true;

            pyshell = new PythonShell('NewScrapper/Utils.py');

            pyshell.on('message', res => {
                console.log("File Name 2 : " + res);
            });
            pyshell.end((err, code, signal) => { if (err) { throw err } });
        });


    },
};
