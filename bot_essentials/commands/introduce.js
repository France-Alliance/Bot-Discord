module.exports = {
	name: 'introduce',
	description: 'Introduce people into an alliance and send a welcome message !',
	aliases: ['intro'],
	usage: '<nb of role to remove> <nb of role to add> <nb of channel to send a message> <roles to remove> <roles to add> <channels to send message> <Message to send>',
	cooldown: 0,
	execute(message, args) {

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])){
            message.channel.send(
                "Sorry, friend :broken_heart: :shrug: I don't have permission to perform this command!"
              );
        }
        
        nb_rve= args[0]
        nb_add= args[1]
        nb_chl= args[2]

        first_rve=3       
        last_rve=3+nb_rve

        first_add=last_rve+1       
        last_add=last_rve+nb_rve

        first_chl=last_add+1
        last_chl=last_add+nb_chl
        //rve=[3, ... , last_rve]
        //add=[last_rve+1, ... ,  last_add]
        //chl=[last_add, ... , last_chl]

        rve=[]
        while  (i>first_rve && i<last_rve) {
            rve.push(i)
            i++
        }

        add=[]
        while  (i>first_add && i<last_add) {
            add.push(i)
            i++
        }

        chl=[]
        while  (i>first_chl && i<last_chl) {
            chl.push(i)
            i++
        }

        for (i in rve) {
            role_ID=rve[i].replace('<@!','').replace('>','')
            try {
                message.guild.roles.cache.find(role_ID)
                message.channel.send("Good")
            } catch (error){
                message.channel.send("Which role do I give to this user, frog lover? :point_right: :point_left:")

            }
        }
            
        for (i in add) {
            role_ID=add[i].replace('<@!','').replace('>','')
            try {
                message.guild.roles.cache.find(role_ID)
                message.channel.send("Good")
            } catch (error){
                message.channel.send("Which role do I give to this user, frog lover? :point_right: :point_left:")

            }
        }
        for (i in chl) {
            chl_ID=chl[i].replace('<#','').replace('>','')
            try {
                message.guild.roles.cache.find(role_ID)
                message.channel.send("Good")
            } catch (error){
                message.channel.send("Which role do I give to this user, frog lover? :point_right: :point_left:")

            }
        }
   /*
    
    if (rMember.roles.has(role.id)) {
        message.channel.send(
            `$rMember.displayName), already has this role!`
        );
    } else {
        await rMember.roles.add(role.id).catch((e) => console.log(e));
        message.channel.send(
            `The role ${role.name} has been added to ${rMember.displayName}.`
        );
    }
*/

	}
}
