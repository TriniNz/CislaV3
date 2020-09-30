exports.run = async (Discord, client, message, args) => {

    if(!message.member.hasPermission('ADMININSTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    let memberToSet = message.mentions.members.first(),
        adRoleSet = message.guild.roles.cache.get('735942305055506445');
        roleToSet = message.mentions.roles.first(),
        logChannelID = '735663163097219112',
        staffRoles = ['735940315403386921','754596104728871002','735940588221890741','735940702319673365','735940702319673365','735940876395741216'];

    if(!staffRoles.includes(roleToSet.id)) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Este não é um cargo valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});
    
    if(!memberToSet) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não marcou nem um membro valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(!memberToSet) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não marcou nem um cargo valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    memberToSet.roles.add([`${roleToSet.id}`,`${adRoleSet.id}`]).then(() => {
        
        message.channel.send(new Discord.MessageEmbed()
            .setDescription("✅ | Cargo setado com sucesso.")
            .setFooter(`CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

        client.channels.cache.get(logChannelID).send(new Discord.MessageEmbed()
            .setAuthor('Staff - Promoção.')
            .setDescription('Um membro acabou de receber um cargo.')
            .addField('Informações:', ` • **Membro**: ${memberToSet.displayName}\n • **Cargo**: ${roleToSet}\n • **Responsável**: ${message.author.username}`)
            .setThumbnail(memberToSet.user.displayAvatarURL())
            .setFooter(`CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        ); 

    }).catch(err => {

        message.channel.send(new Discord.MessageEmbed()
            .setDescription("❎ | Houve um erro inesperado ao setar este cargo.")
            .setFooter(`CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});
        console.log("Erro no comando setstaff.\n\n " + err)

    })
}