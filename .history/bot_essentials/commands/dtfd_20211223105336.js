   
module.exports = {
	name: 'dtfd',
	description: 'Data feeder',
	execute(message) {
        message.channel.send(`Please wait. Gathering data...`);
        AM2S.script().then(() => {
          message.channel.send(
            `:arrow_right:${AM2S.output_file_name()[1].replace(".txt" ,'')}`,
            {
              files: [AM2S.output_file_name()[0]],
            }
          );
        });
	},
};