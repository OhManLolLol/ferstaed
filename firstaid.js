
const discord = require('discord.js')
const bot = new discord.Client()
const mysql = require('mysql')
const fs = require('fs')

let config = require('./config.json')
let owner = require("./config.json").ownerid

bot.login(prosses.env.BOT_TOKEN)

bot.on('ready', () => {
    console.log('Inside the console as ' + bot.user.username + ' and you see me in ' + bot.guilds.size + ' guilds or now u dont!')
});



//functions bb (no roll dfuncoinn)

function userinfo(user) {

var finalstring = '';

finalstring += '**' + user.username + '#' + user.discriminator + '**,' + ' with the **ID** of ' + '**' + user.id + '**' + ' and created his/her account on ' + '**' + user.createdAt + '**' + 
" Is it verified? " + '**' + user.verified + '**';
 

return finalstring;

}




var con = mysql.createConnection({
	host: "localhost",
	user: "OhManLolLol",
	password: "121345werty",
	database: "FIRSTDATABASE"
});

con.connect(err => {
	if(err) throw err;
	console.log("yo so im in ur database how does that feel?");
});

function generateXp() {
	let MAXMASTER = 550;
	let MINMASTER = 100;
	
	return Math.floor(Math.random() * (MAXMASTER - MINMASTER + 1)) + MINMASTER;
}

bot.on('message', message => {
	const sender = message.author;
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
	
	con.query(`SELECT * FROM exp WHERE id = '${message.author.id}'`, (err, rows) => {
	  if(err) throw err;
	  
	  let sql;
	  
	  if(rows.length < 1) {
		  sql = `INSERT INTO exp (id, exp) VALUES ('${message.author.id}', ${generateXp()})`
	  } else {
		  let exp = rows[0].exp;
		  sql = `UPDATE exp SET exp = ${exp + generateXp()} WHERE id = '${message.author.id}'`;
	  }
	  con.query(sql);
	  
	  console.log(rows);
  });
  
    let command = message.content.split(" ")[0]; 
    command = command.slice(config.prefix.length);
    console.log(message.author.username + '#' + message.author.discriminator + ' (' + message.author.id + ') did the command: ' + command + " on " + message.guild.name);
  let args = message.content.split(" ").slice(1);
  
 
  
  if (command === "hello"){
      message.channel.send("sup m8")
  }
  
   if (command === "warn"){
            let staffRole = message.guild.roles.find("name", "Moderator", "Administrator", "Co-Owner", "Owner", "Owners");
            if (!staffRole) return message.reply("No Roles Found: " + "\"" + "Staff Roles" + "\"");
            if (!message.member.roles.has(staffRole.id)) {
                return message.reply("Error: You either do not have permission to use this command, or the role Moderator and Administrator have not been created yet.")
            }
        let reason = args.splice(1).join(' ');
        let user = message.mentions.users.first();
        if (reason.length < 1) return message.reply('You must give the reason to warn the person.');
        if (message.mentions.users.size < 1) return message.reply("You must mention the user you are going to warn.").catch(console.error);
        message.reply("Successfully warned " + user + " for " + "\"" + reason + "\"!")
        console.log(message.author.username + '#' + message.author.discriminator + ' (' + message.author.id + ') ' + 'has warned ' + user + ' for ' + reason);
    }
	
if (command === "ban"){
             let staffRole = message.guild.roles.find("name", "Administrator", "Owner", "Co-Owner", "Owners", "owner");
             if (!message.member.roles.has(staffRole.id)) {
                 return message.channel.sendMessage("You do not have permission to use this command.")
             }
         w
         let user = message.mentions.users.first();
         if (!staffRole) return message.channel.sendMessage("No Roles Found: Administrator");
         if (reason.length < 1) return message.channel.sendMessage('You must give the reason to ban the person.');
         if (message.mentions.users.size < 1) return message.channel.sendMessage("You must mention the user you are going to ban.").catch(console.error);
         if (!message.guild.member(user).bannable) return message.channel.sendMessage("I cannot ban that member (Higher Role?)");
         message.guild.member(user).ban();
         message.channel.sendMessage("Successfully banned " + user + " for " + "\"" + reason + "\"!")
         console.log(message.author.tag + ' (' + message.author.id + ') ' + ' has banned ' + user + ' for ' + "\"" + reason + "\"");
     }
	 
	 if (command === "ping"){
	 message.channel.sendEmbed(new discord.RichEmbed().setTitle(":ping_pong: Pong! " + bot.ping + " ms.").setColor(0x00FF00))
	 }
	 
	 if(command === "restart"){
		 if(!isOwner(message.author.id)) return message.reply("No Permissions!")
		 console.log("Restarting...")
   process.exit()
}

 if (command === "eval"){
  if(!isOwner(message.author.id)) return;
  try {

    var code = args.join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
    //message.channel.sendMessage(":inbox_tray: **INPUT**\n")
    message.channel.sendEmbed(new discord.RichEmbed().addField("Javascript Eval:", "Success!").addField(":inbox_tray: **INPUT**", "```" + args.join(" ") + "```").addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```").setColor(0xFFDF00))
    //message.channel.sendCode("xl", args.join(" "));
    //message.channel.sendMessage(":outbox_tray: **OUTPUT**\n")

    //message.channel.sendCode("xl", clean(evaled));

  } catch (err){

    message.channel.sendEmbed(new discord.RichEmbed().addField("Javascript Eval ERROR:", "There was a problem with the code your trying to run!").addField("Error", "```" + clean(err) + "```").setColor(0xFFDF00))
    //message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
}

 if (command === "invite"){
	 message.channel.send("You wanna invite me to some other servers? Okay, fine with me! https://discordapp.com/oauth2/authorize?client_id=312963729685741568&scope=bot&permissions=8")
 }
 
 if (command === "help"){
	 message.channel.sendEmbed(new discord.RichEmbed().setTitle("The commands i have for now are... ").setColor(0x00FF00).addField("Usable Commands:", "!invite, !help, !ping, !hello, !8ball, !say, !guilds, !roll, !credits, !catch, !chumdrum, !exp, !avatar, and !server.").addField("Staff Commands:", "!warn (Mod), !kick (Mod), !createrole (bugz), !removerole (bugz), !clear (Mod), !ban (Admin).").addField("Bot Owner Commands:", "!eval, !restart, !setgame.").addField("WHAT IS EXP?", "EXP, is when you use a command on the bot, you get a range from 10 exp to 55. SO start using commands, and have the most exp in the server! Also, use the command !exp (user) to check on anybody's exp!"))
 }
 
 if(command === "8ball")
    {
        message.reply(':8ball: ' + doMagic8BallVoodoo() + " :8ball:");
    }

    function doMagic8BallVoodoo() {
        var rand = ['Yes', 'No', 'It is certain.', 'What do you think? NO', 'Maybe', 'Never', 'Yep', 'In the future.', 'Probably','Dont count on it.'];

        return rand[Math.floor(Math.random()*rand.length)];
}

if (command === "say"){
        if(!args[0]){
            message.reply("Please type in something to say");
        } else {
            message.delete()
            message.channel.sendMessage(args.join(' '))
        }

    }
	
		if (command === "setgame"){
if(!isOwner(message.author.id)) return;
        if(!args[0]){
            message.reply("Please type in a game name");
        } else {
            message.delete()
            //bot.user.setGame(args.join(' '))
        }

    }
	
	if (command === "server"){
		message.channel.send("You can see the server we usually test stuff like new updates here! https://discord.gg/fwukZTk")
	}
	
	if (command === "guilds"){
		message.channel.send(":thinking: I am in "+ bot.guilds.size + " servers!")
	}
	
	if (command === "credits"){
		message.channel.send("Credits are...\nCoder: FireMario211\nEditor: OhManLolLol (also made some commands)\nOwner: OhManLolLol\n Mods: OliverJay07")
	}
	
	if(command === "roll"){
        message.reply(':crystal_ball: You rolled: ' + doRollingDice());
    }

    function doRollingDice() {
        var rand = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'rekt you got no number', '14', '15', '16', '17', '18', '19', '20', '21'];

        return rand[Math.floor(Math.random()*rand.length)];
}
if (command === "kick"){
            let staffRole = message.guild.roles.find("name", "Moderator", "mod");
            if (!message.member.roles.has(staffRole.id)) {
                return message.reply("You do not have permission to use this command.")
            }
        let reason = args.splice(1).join(' ');
        let user = message.mentions.users.first();

        if (!staffRole) return message.reply("No Roles Found: " + "\"" + "Moderator" + "\"");

        if (reason.length < 1) return message.reply('You must give the reason to kick the person.');
        if (message.mentions.users.size < 1) return message.reply("You must mention the user you are going to kick.").catch(console.error);

        if (!message.guild.member(user).kickable) return message.reply("I cannot kick that member (Higher Role?)");
        message.guild.member(user).kick();

        message.reply("Successfully kicked " + user + " for " + "\"" + reason + "\"!")
        console.log(message.author.username + '#' + message.author.discriminator + ' (' + message.author.id + ') ' + ' has kicked ' + user + ' for ' + "\"" + reason + "\"");
    }
	
	if (command === "avatar"){
		let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
		message.reply("your/their vatar is " + target.avatarURL)
}

	if (command === "createrole"){
		let staffRole = message.guild.roles.find("name", "Administrator");
            if (!message.member.roles.has(staffRole.id)) {
                return message.reply("You do not have permission to use this command.")
            }

        if (!staffRole) return message.reply("No Roles Found: " + "\"" + "Administrator" + "\"");

let rolename = args.join(" ")
if(rolename < 1) return message.reply("Please enter a role name!")
message.guild.createRole({
  name: rolename,
})
.then(role => console.log(`A user created a role named ${role}`))
.catch(console.error)

        let role1 = bot.guilds.get(message.guild.id).roles.find('name', rolename);
message.guild.member(message.author).addRole(role1)
	}
	if (command === "removerole"){
		 let staffRole = message.guild.roles.find("name", "Administrator");
            if (!message.member.roles.has(staffRole.id)) {
                return message.reply("You do not have permission to use this command.")
            }

        if (!staffRole) return message.reply("No Roles Found: " + "\"" + "Administrator" + "\"");

let rolename = args.join(" ")
if(rolename < 1) return message.reply("Please enter a role name!")
message.guild.deleteRole({
  name: rolename,
})
.then(role => console.log(`A user removed a role named ${role}`))
.catch(console.error)
	}
	
	if (command === "catch"){
        message.reply(':fishing_pole_and_fish: You have caught a: ' + doCatchingThings());
    }

    function doCatchingThings() {
        var rand = ['Pikachu', 'Blowfish', 'Fish', 'Nothing', 'Virus', 'Something', 'Squirtle', 'Everything/Anything'];

        return rand[Math.floor(Math.random()*rand.length)];
}

 if (command === "clear"){

            let staffRole = message.guild.roles.find("name", "Moderator");
            if (!staffRole) return message.reply("No Roles Found: " + "\"" + "Moderator" + "\"");
            if (!message.member.roles.has(staffRole.id)) {
                return message.reply("You do not have permission to use this command.")
            }
			if(!args[0]){
			return message.reply("Please state a number to clear")
			} else {
            let messagecount = parseInt(args[0]);
        message.channel.fetchMessages({limit: messagecount})
            .then(messages => message.channel.bulkDelete(messages));

            message.reply(":wastebasket: Successfully Cleared " + messagecount + " messages.")
 }}

	if (command === "chumdrum"){
		message.reply("https://www.youtube.com/watch?v=tVj0ZTS4WF4")
	}
	
		if (command === ".3601589+20+621+672075798198tyr1yh981rds98hyrtfes"){
		message.channel.send("You found the secret message. DM the owner for maybe perms to new secret cmds and sneak peeks on updates? Maybe even an owner cmd? admin cmd? THE BOT ITSELF? You never know.")
	}
	
	if (command === "exp"){
	let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
	
	con.query(`SELECT * FROM exp WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err;
		
		if(!rows[0]) return message.channel.send("I don't think this person has EXP, so he/she doesn't use this bot")
		let exp = rows[0].exp;
		message.reply("your or his/her experience is... " + exp);
	});
}

if (command === "myinfo"){
	
	message.channel.send(userinfo(sender));
	
}

if (command === "add"){
	let numArray = args.map(n=> parseInt(n));
	let total = numArray.reduce( (p, c) => p+c);
	
	message.channel.send("Answer is " + total)
}

if (command === "subtract"){
	let numArray = args.map(n=> parseInt(n));
	let total = numArray.reduce( (p, c) => p-c);
	
	message.channel.send("Answer is " + total)
}

// rank command (put commands up before rank cmd k)

});
function isOwner(id) {
  return (owner.indexOf(id) > -1);
}
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
