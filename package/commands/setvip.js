exports.run = async (Discord, client, message, args) => {

    if(!message.member.hasPermission('ADMININSTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    let memberToSet = message.mentions.members.first(),
        adRoleSet = message.guild.roles.cache.get('754941221348180008');
        roleToSet = message.mentions.roles.first(),
        logChannelID = '735663163097219112',
        vipRoles = ['735941748299399228','735941653574975541','735941357339803650','754944743812890664','754945720838127686'];

    if(!vipRoles.includes(roleToSet.id)) return message.channel.send(new Discord.MessageEmbed()
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

        memberToSet.send(new Discord.MessageEmbed()
            .setAuthor('Seu cargo vip foi setado com sucesso.')
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
        console.log("Erro no comando setvip.\n\n " + err)

    })
}