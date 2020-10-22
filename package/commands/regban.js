exports.run = async (Discord, client, message, args) => {

    let SendChannel = '764672864866926592';

    if(!message.member.roles.cache.get('735942305055506445')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
    )

    let item = args.join(' ').split(';');
    

    const name = item[0],
        motivo = item[1],
        prova = item[2],
        tipo = item[3];

    if(!name || !motivo || !prova || !tipo) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Comando utilizado incorretamente. O uso correto é `!regban Nickname; Motivo; Prova; Tipo.`")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
    )

    message.guild.channels.cache.get(SendChannel).send(new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`**Registrou uma punição.**\n\nInformações:\n • **Player**: ${name}\n • **Motivo**: ${motivo}\n • **Provas**: ${prova}\n • **Tipo**: ${tipo}`)
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
    ).then(Sucess => message.channel.send(new Discord.MessageEmbed().setFooter('Punição registrada com sucesso.').setColor('#9900cc')));

}
