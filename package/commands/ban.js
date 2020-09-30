exports.run = async (Discord, client, message, args) => {

    args.shift()
    let memberToBan = message.mentions.members.first(),
        reason = args.join(' '),
        logChannelID = "754792145407311973";
    
    if(!memberToBan) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não marcou nem um membro valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(!memberToBan.bannable) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Não foi possivel banir este usuario.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(args.length < 1) reason = "Não especificado pelo responsável."

    memberToBan.ban({reason:`Motivo: ${reason} | Responsável: ${message.author.username}`}).then(msg => {

        message.channel.send(new Discord.MessageEmbed()
            .setFooter(`Membro banido com sucesso.`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});
        
        client.channels.cache.get(logChannelID).send(new Discord.MessageEmbed()
            .setAuthor('Punições - Ban.')
            .setDescription('Um membro acabou de ser banido de nosso servidor.')
            .addField('Informações:', ` • **Membro**: ${memberToBan.displayName}\n • **Motivo**: ${reason}\n • **Responsável**: ${message.author.username}`)
            .setThumbnail(memberToBan.user.displayAvatarURL())
            .setFooter(`Member ID: ${memberToBan.id} • CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        ); 

    });
}