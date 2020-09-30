exports.run = async (Discord, client, member) => {

    let ChannelBotSpam = '735291757310509178';
    client.channels.cache.get(ChannelBotSpam).send(new Discord.MessageEmbed()
        .setTitle(`${member.user.username} Saiu do servidor.`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription('Até mais ;( Espero que volte...')
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
    );

}