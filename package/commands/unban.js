exports.run = async (Discord, client, message, args) => {

    let unbanMemberID = args[0],
        logChannelID = '754792145407311973';

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(isNaN(unbanMemberID) || unbanMemberID.length < 17 || unbanMemberID.length > 19) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Este não é um ID valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    message.guild.fetchBan(unbanMemberID).then(BanInfo => {

        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Punições - Unban.')
            .setDescription("Confira as informações, caso estejam corretas reaja com ✅ para confirmar o unban.")
            .addField("Informações: ",`• Usuario: ${BanInfo.user.username}#${BanInfo.user.discriminator} (${BanInfo.user.id})\n• ${BanInfo.reason.split('|').join('\n • ')}`)
            .setFooter(`CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(async msgConfirm => {
        
            await msgConfirm.react('✅')
        
            let collect = msgConfirm.createReactionCollector((reaction, user) => reaction.emoji.name == '✅' && user.id == message.author.id, {time: 30*1000, max: 1})

            collect.on('collect', () => {

                message.guild.members.unban(unbanMemberID).then(() => { 
                    msgConfirm.edit(new Discord.MessageEmbed()
                        .setFooter(`Usuario desbanido com sucesso.`)
                        .setColor('#9900cc')
                    )
                    msgConfirm.delete({timeout: 15*1000});
                    message.delete({timeout: 15*1000})

                    client.channels.cache.get(logChannelID).send(new Discord.MessageEmbed()
                        .setAuthor('Punições - Ban.')
                        .setDescription('Um membro acabou de ser desbanido de nosso servidor.')
                        .addField('Informações:', ` • **Membro**: ${BanInfo.user.username}#${BanInfo.user.discriminator}\n • **Responsável**: ${message.author.username}`)
                        .setFooter(`Member ID: ${BanInfo.user.id} • CislaV3!`)
                        .setColor('#9900cc')
                        .setTimestamp()
                    );

                })
            })
        })

    }).catch(err => {

        if(err.code == 10026) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("❎ | Este membro não está banido.")
            .setFooter(`CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})})
        else console.log(err)
    })

}