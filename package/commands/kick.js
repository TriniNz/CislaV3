exports.run = async (Discord, client, message, args) => {

    args.shift()
    let memberToKick = message.mentions.members.first(),
        reason = args.join(' '),
        logChannelID = "754792145407311973";

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    
    if(!memberToKick) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não marcou nem um membro valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(!memberToKick.kickable) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Não foi possivel expulsar este usuario.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(args.length < 1) reason = "Não especificado pelo responsável."

    memberToKick.kick().then(() => {

        message.channel.send(new Discord.MessageEmbed()
            .setFooter(`Membro expulso com sucesso.`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

        
        client.channels.cache.get(logChannelID).send(new Discord.MessageEmbed()
            .setAuthor('Punições - Kick.')
            .setDescription('Um membro acabou de ser expulso de nosso servidor.')
            .addField('Informações:', ` • **Membro**: ${memberToKick.displayName}\n • **Motivo**: ${reason}\n • **Responsável**: ${message.author.username}`)
            .setThumbnail(memberToKick.user.displayAvatarURL())
            .setFooter(`Member ID: ${memberToKick.id} • CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        ); 

    });
}