exports.run = async (Discord, client, message, args) => {

    let ChannelID = '770494700045205524'
        MessageID = args[0],
        savesID = [];

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(isNaN(ChannelID) || ChannelID.length < 17 || ChannelID.length > 19) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Este não é um ID de canal valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(isNaN(MessageID) || MessageID.length < 17 || MessageID.length > 19) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Este não é um ID de mensagem valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    try {
        message.guild.channels.cache.get(ChannelID).messages.fetch(MessageID).then(async Msgfetched => {

            let uss = await Msgfetched.reactions.cache.first().users.fetch({limit: 100})
            uss.map(usr => savesID.push(usr.id));

            if(savesID.length < 2) message.channel.send(new Discord.MessageEmbed()
                .setDescription("❎ | Não há membros suficiente para iniciar o giveway.")
                .setFooter(`CislaV3!`)
                .setColor('#9900cc')
                .setTimestamp()
            ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})})
            
            let sort = savesID[Math.floor(Math.random() * savesID.length)];

            message.delete({timeout: 1000})

            let msg = await message.guild.channels.cache.get('770494700045205524').send("🎉 | Sorteado:");
            setTimeout(() => msg.edit(new Discord.MessageEmbed()
                .setDescription(`**<@${sort}>**, Parabéns!`)
                .setFooter(`Responsável: ${message.author.username} • CislaV3!`, message.author.displayAvatarURL())
                .setColor('#9900cc')
                .setTimestamp()
            ) ,1*1000)

        }).catch(err => console.log(err))
    } catch(err) {
        if(err.message == "Cannot read property 'messages' of undefined") return message.channel.send(new Discord.MessageEmbed()
            .setDescription("❎ | Mensagem não encontrada. Verifique os argumentos.")
            .setFooter(`CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    }

}
