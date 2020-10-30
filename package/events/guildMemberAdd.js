exports.run = async (Discord, client, member) => {

    let UnregisterRoleID = '735291847789772885';
    member.roles.add(UnregisterRoleID);

    let ChannelBotSpam = '735291757310509178';
    client.channels.cache.get(ChannelBotSpam).send(new Discord.MessageEmbed()
        .setTitle(`🎉 ${member.user.username} Entrou no servidor!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription('Seja bem vindo(a)! Registre-se e desfrute o maximo de nosso servidor.')
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
    );

}
