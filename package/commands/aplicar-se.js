exports.run = async (Discord, client, message, args) => {

    let URLForm = 'https://docs.google.com/forms/d/e/1FAIpQLSewdIkGk_O6TG4yqkgVkIWlglUoODm9cxv1aWeodsyWQFJr4Q/viewform',
        Vagas = true

    if(Vagas) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Clique __[aqui](${URLForm})__ para abrir o formulario de aplicação à equipe.`)
        .setFooter('CislaV3!')
        .setColor('#9900cc')
        .setTimestamp()
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});
    else return message.channel.send(new Discord.MessageEmbed()
        .setFooter('Não há vagas para equipe no momento. • CislaV3!')
        .setColor('#9900cc')
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})});


}