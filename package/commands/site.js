exports.run = async (Discord, client, message, args) => {

    message.channel.send(new Discord.MessageEmbed()
        .setDescription('[Clique aqui](https://cislav3.com.br/) para acessar nosso site oficial! 🖥️')
        .setFooter(`CislaV3!`)
        .setColor('#9900cc')
    ).then(msg => {message.delete({timeout: 15*1000}); msg.delete({timeout: 15*1000})})
}