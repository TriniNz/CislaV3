exports.run = async (Discord, client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Você não tem permissão para executar este comando.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});

    if(message.channel.topic && message.channel.topic.toLowerCase().includes('ticket')) {

        let emojiIndentify = message.channel.topic.substr(0,2),
            idIndentify = message.channel.topic.split(' ');
    
        message.guild.channels.cache.get('753954023576567904').messages.fetch('754652899728031784').then(msg => msg.reactions.cache.get(emojiIndentify).users.remove(idIndentify[idIndentify.length - 1]).then(sucess => {
            message.channel.delete({timeout: 5*1000})
        }))

    } else return message.channel.send(new Discord.MessageEmbed()
        .setDescription("❎ | Este não é um canal de ticket.")
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});
}
