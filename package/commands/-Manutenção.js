exports.run = async (Discord, client, message, args) => {

    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Comando em manutenção ativada pelo desenvolvedor.`)
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})})
}