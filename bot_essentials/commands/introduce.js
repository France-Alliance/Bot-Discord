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
        await rMember.roles.add(role.id).catch((e) => //console.log(e));
        message.channel.send(
            `The role ${role.name} has been added to ${rMember.displayName}.`
        );
    }
*/

	}
}
module.exports = {
    name: "introduce",
    description: "Introduce people into an alliance and send a welcome message !",
    aliases: ["intro"],
    usage:
      "<nb of members to modify roles> <nb of role to remove> <nb of role to add> <nb of channel to send a message> | <members> <roles to remove> <roles to add> <channels to send message> <Message to send>",
    cooldown: 0,
    execute(message, args) {
      //console.log("step 1");
      //console.log("---");
      //console.log("");
  
        //console.log("args: "+args)

      if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
        message.channel.send(
          "Sorry :broken_heart: :shrug: I don't have permission to perform this command!"
        );
      }

      
  
      nb_mbr = Number(args[0]);
      nb_rve = Number(args[1]);
      nb_add = Number(args[2]);
      nb_chl = Number(args[3]);
  
      //console.log("nb_mbr: " + nb_mbr);
      //console.log("nb_rve: " + nb_rve);
      //console.log("nb_add: " + nb_add);
      //console.log("nb_chl: " + nb_chl);
  
  
  
      //console.log("");
      //console.log("---");
      //console.log("step 2");
      //console.log("---");
      //console.log("");
  
      if (nb_mbr != 0) {
        first_mbr = 4;
        last_mbr = first_mbr + nb_mbr - 1;
      } else {
        first_mbr = 3;
        last_mbr = 3;
      }
  
      if (nb_rve != 0) {
        first_rve = last_mbr + 1;
        last_rve = first_rve + nb_rve - 1;
      } else {
        first_rve = last_mbr;
        last_rve = last_mbr;
      }
  
      if (nb_add != 0) {
        first_add = last_rve + 1;
        last_add = first_add + nb_add - 1;
      } else {
        first_add = last_rve;
        last_add = last_rve;
      }
  
      if (nb_chl != 0) {
        first_chl = last_add + 1;
        last_chl = first_chl + nb_chl - 1;
      } else {
        first_add = last_add;
        last_add = last_add;
      }
  
      //console.log("Member: ["+first_mbr+", "+last_mbr+"]")
      //console.log("Remove: ["+first_rve+", "+last_rve+"]")
      //console.log("Add: ["+first_add+", "+last_add+"]")
      //console.log("Channel: ["+first_chl+", "+last_chl+"]")
  
      function rve_r(mbr) {
        if (nb_rve != 0) {
          first_rve = last_mbr + 1;
          last_rve = first_rve + nb_rve -1;
          i = 0;
          rve = [];
          while (i <= last_rve) {
            if (i >= first_rve) {
              ////console.log("i:"+i+" => args[i]: "+args[i])
              role = args[i].replace("<@&", "").replace(">", "");
              //console.log(mbr + " role_RVE: " + role);
              rve.push(role)
            }
            i++;
          }
          ////console.log(rve)
          mbr.roles.remove(rve);
          message.channel.send("Role(s) removed");
        } else {
          message.channel.send("No role to remove");
          //console.log("No role to remove");
        }
      }
  
      function add_r(mbr) {
        if (nb_add != 0) {
          first_add = last_rve + 1;
          last_add = first_add + nb_add -1;
          i = 0;
          add = [];
          while (i <= last_add) {
            if (i >= first_add) {
              ////console.log("i:"+i+" => args[i]: "+args[i])
              role = args[i].replace("<@&", "").replace(">", "");
              //console.log(mbr + " role_ADD: " + role);
              add.push(role)
            }
            i++;
          }
          ////console.log(add)
          mbr.roles.add(add);
          message.channel.send("Role(s) added");
        } else {
          message.channel.send("No role to add");
          //console.log("No role to add");
        }
      }
  
      function chl_r(){
        if (nb_chl != 0) {
          first_chl = last_add + 1;
          last_chl = first_chl + nb_chl - 1;
          i = 0;
          channel = []
          while (i <= last_chl) {
            if (i >= first_chl) {
              ////console.log("i:"+i+" => args[i]: "+args[i])
              chl = args[i].replace("<#", "").replace(">", "");
              channel=message.guild.channels.cache.get(chl)
              //console.log("CHL: " + chl+" | Channel: "+channel);

              first_txt=last_chl+1
              pre_text=[]
              text=""
              a=0
              while (a < args.length){
                  if (a >= first_txt) {
                      pre_text.push(args[a])
                  } 
                  a++
              }
              text=pre_text.join(" ")
              //console.log("text: "+text)
              channel.send(text)
            }
            i++;
          }
          

          
          message.channel.send("Message sent");
          
        } else {
          message.channel.send("No message to send");
          //console.log("No message to send");
        }
        
      }

      function messag_FC() {
        
      }
  
      //console.log("");
      //console.log("---");
      //console.log("step 3");
      //console.log("---");
      //console.log("");
      /*
      //console.log("first_mbr: " + first_mbr);
      //console.log("last_mbr: " + last_mbr);
      //console.log("first_rve: " + first_rve);
      //console.log("last_rve: " + last_rve);
      //console.log("first_add: " + first_add);
      //console.log("last_add: " + last_add);
      //console.log("first_chl: " + first_chl);
      //console.log("last_chl: " + last_chl);
      */
      i = 0;
      mbr = [];
      while (i <= last_mbr) {
        if (i >= first_mbr) {
          //console.log("mbr");
          mbr.push(i);
        }
        i++;
      }
  
      //console.log("");
      //console.log("---");
      //console.log("step 4");
      //console.log("---");
      //console.log("");
  
      //console.log("mbr: ", mbr);
      ////console.log("rve: ",rve);
      ////console.log("add: ",add);
      ////console.log("chl: ",chl);
  
      //console.log("");
      //console.log("---");
      //console.log("step 5");
      //console.log("---");
      //console.log("");
  
      //console.log("");
      //console.log("--MBR--");
      for (i in mbr) {
        mbr_ID = args[mbr[i]];
        mbr_ID = mbr_ID.replace("<@!", "").replace(">", "").toString();
        member = message.guild.member(mbr_ID);
        //console.log("member_NAME: " + member.user.username);
        //console.log("member_ID: " + mbr_ID);
        try {
          try {
            rve_r(member);
          } catch (err) {
            //console.log("ERROR:\r");
            //console.log(err);
          }
          try {
            add_r(member);
          } catch (err) {
            //console.log("ERROR:\r");
            //console.log(err);
          }
          try {
            chl_r(member);
          } catch (err) {
            //console.log("ERROR:\r");
            //console.log(err);
          }
  
          message.channel.send(
            ":point_right: :white_check_mark: :point_left:"
          );
          //console.log("Good");
        } catch (error) {
          //console.log("ERROR:\r");
          //console.log(error)
          message.channel.send(":point_right: :x: :point_left:");
        }
        //console.log("");
      }
  
      //console.log("");
      //console.log("---");
      //console.log("step 6");
      //console.log("---");
      //console.log("");


    },
  };