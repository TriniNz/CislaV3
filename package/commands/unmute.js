exports.run = async (Discord, client, message, args) => {

    args.shift()
    let memberToUnMute = message.mentions.members.first(),
        muteRole = "755069456287531128",
        normalMemberRole = "735291847789772885",
        logChannelID = "754792145407311973";

    if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(!memberToUnMute) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não marcou nem um membro valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(!memberToUnMute.roles.cache.get(muteRole)) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Este membro não está mutado.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})})

    memberToUnMute.roles.remove(muteRole).then(() => {

        memberToUnMute.roles.add(normalMemberRole);

        message.channel.send(new Discord.MessageEmbed()
            .setFooter(`Membro unmutado com sucesso.`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});
        
        client.channels.cache.get(logChannelID).send(new Discord.MessageEmbed()
            .setAuthor('Punições - UnMute.')
            .setDescription('Um membro acabou de ser desmutado de nosso servidor.')
            .addField('Informações:', ` • **Membro**: ${memberToUnMute.displayName}\n • **Responsável**: ${message.author.username}`)
            .setThumbnail(memberToUnMute.user.displayAvatarURL())
            .setFooter(`Member ID: ${memberToUnMute.id} • CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        );

    })
}