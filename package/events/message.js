exports.run = async (Discord, client, message, dbcmd, savetocaptcha) => {

    let prefix = "!",
        musicChannelID = "760683203241181201",
        CaptchaRole = '735291847789772885';

    if(message.author.bot) return;
    if(message.channel.id == musicChannelID) return;

    let args = message.content.trim().split(/ +/g),
        cmd = args.shift().toLowerCase().replace(prefix, ''),
        cmdValue = dbcmd.get('Commands');

    if(message.channel.type == 'dm' && client.guilds.cache.get('735278653600170024').members.cache.get(message.author.id) && !client.guilds.cache.get('735278653600170024').members.cache.get(message.author.id).roles.cache.get(CaptchaRole) && message.content.toLowerCase() == "verify" && !savetocaptcha) return require('../commands/-Verify.js').run(Discord, client, message, args, savetocaptcha);

    if(message.channel.type == "dm") return;

    if(message.content.indexOf(prefix) == 0) { 
        try {
            let cmdSearch = cmdValue.find({aliases: [cmd]}).value();

            if(cmdSearch.manutenção) return require('../commands/-Manutenção.js').run(Discord, client, message, args);

            let cmdFound = require(`../commands/${cmdSearch.name}.js`);
            return cmdFound.run(Discord, client, message, args)

        } catch (err) {

            if(err.message == "Cannot read property 'manutenção' of undefined") return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`❎ | Comando não encontrado. Use ${prefix}cmdlist para ver a lista de comandos.`)
                .setFooter(`CislaV3!`)
                .setColor('#9900cc')
            ).then(cmdNotFound => {cmdNotFound.delete({timeout:15*1000}); message.delete({timeout:15*1000})})

            if(err.message != "Cannot read property 'manutenção' of undefined") return message.channel.send(new Discord.MessageEmbed()
                .setDescription("❎ | Houve um erro ao executar este comando.")
                .setFooter(`CislaV3!`)
                .setColor('#9900cc')
            ).then(cmdNotFound => {cmdNotFound.delete({timeout:15*1000}); message.delete({timeout:15*1000}); console.log(err)})

        }
    }    
}