exports.run = async (Discord, client, message, args) => {

    args.shift()
    let memberToMute = message.mentions.members.first(),
        reason = args.join(' '),
        muteRole = "755069456287531128",
        logChannelID = "754792145407311973";

    if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(!memberToMute) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não marcou nem um membro valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(memberToMute.roles.cache.get(muteRole)) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Este membro já está mutado. Use `!unmute @Membro` para remover.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})})

    if(args.length < 1) reason = "Não especificado pelo responsável."

    if(memberToMute.roles.cache.size > 1) memberToMute.roles.cache.map(R => {
        memberToMute.roles.remove(R.id).catch(() => {});
    });

    await memberToMute.roles.add(muteRole).then(() => {
        
        message.channel.send(new Discord.MessageEmbed()
            .setFooter(`Membro silenciado com sucesso.`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

        
        client.channels.cache.get(logChannelID).send(new Discord.MessageEmbed()
            .setAuthor('Punições - Mute.')
            .setDescription('Um membro acabou de ser silenciado de nosso servidor.')
            .addField('Informações:', ` • **Membro**: ${memberToMute.displayName}\n • **Motivo**: ${reason}\n • **Responsável**: ${message.author.username}`)
            .setThumbnail(memberToMute.user.displayAvatarURL())
            .setFooter(`Member ID: ${memberToMute.id} • CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        );
    })

}