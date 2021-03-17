const date = require(`../functions/Time`);
var {PythonShell} = require( 'python-shell')

module.exports = {
  name: "amd",
  description: "Ping!",
  execute(message) {
    message.channel.send("Gathering the data...\rPlease wait")
    let pyshell = new PythonShell('../NewScrapper/main.py');
 
    // sends a message to the Python script via stdin
    // pyshell.send('hello');
     
    pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      //console.log(message);
    });
     
    // end the input stream and allow the process to exit
    pyshell.end(function (err,code,signal) {
      if (err) {throw err}
      //console.log('');
      //console.log('The exit code was: ' + code);
      //console.log('The exit signal was: ' + signal);
      //console.log('');
      //console.log('execution of the python script is finished');
      //console.log('sending the file');
      message.reply(
        ` :arrow_right: data of ${date.date()}-${date.month()}-${date.year()} is ready !`,
        {
          files: [
            `../NewScrapper/data/${date.date()}-${date.month()}-${date.year()}.json`,
          ],
        }
      );
    });
  },
};