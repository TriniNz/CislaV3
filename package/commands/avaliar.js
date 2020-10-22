exports.run = async (Discord, client, message, args) => {

    let staffRole = message.guild.roles.cache.get("735942305055506445"),
        ratedMember = message.mentions.members.first(),
        ratedNumber = args[1],
        ratedReason = args.slice(2).join(' '),
        annonChannel = "768948298039164928",
        normalChannel = "768947951572615179";

    if(!ratedMember) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não marcou nem um membro valido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(!ratedMember.roles.cache.has(staffRole.id)) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Este não é um membro da staff!")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});
    
    if(!ratedNumber || !isNaN(ratedNumber) && ratedNumber < 0 || ratedNumber > 10) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Nota invalida, certefique-se de que é um numero e está acima de 0 e abaixo de 10.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(!ratedReason || ratedReason.length < 10) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Motivo invalido.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    let EmbedToSendAnnon = new Discord.MessageEmbed().setDescription(`Um membro da equipe foi avaliado anonimamente.\n\n• **Membro**: ${ratedMember}\n• **Nota**: ${ratedNumber}\n• **Motivo**: ${ratedReason}`).setFooter(`CislaV3!`).setColor('#9900cc').setTimestamp(),
        EmbedToSend = new Discord.MessageEmbed().setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setDescription(`Um membro da equipe foi avaliado.\n\n• **Membro**: ${ratedMember}\n• **Nota**: ${ratedNumber}\n• **Motivo**: ${ratedReason}`).setFooter(`CislaV3!`).setColor('#9900cc').setTimestamp();

    message.guild.channels.cache.get(annonChannel).send(EmbedToSendAnnon)
    message.guild.channels.cache.get(normalChannel).send(EmbedToSend)

    message.channel.send(new Discord.MessageEmbed()
        .setFooter('Avaliação enviada com sucesso!')
        .setColor('#9900cc')
        .setTimestamp()
    ).then(msg => {msg.delete({timeout: 15*1000}); message.delete()})
}