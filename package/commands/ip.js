const Request = require('request');

exports.run =  async (Discord, client, message, args) => {

    let ip = 'CislaV3.com.br',
        api = 'http://mcapi.us/server/status?ip=' + ip;


    Request(api, (error, response, body) => {
        if(error) return console.log(error)
        
        body = JSON.parse(body);

        if(body.online) {
            message.channel.send(new Discord.MessageEmbed()
                .setAuthor('IP: ' + ip)
                .setURL('https://cislav3.com.br/')
                .setDescription(`${removeColorCode(body.motd)}\n\n • Versão: ${body.server.name}\n • Players:  *${body.players.now}/${body.players.max}*`)
                .setFooter(`CislaV3!`)
                .setColor('#9900cc')
            ).then(msg => {msg.delete({timeout: 30*1000}); message.delete({timeout: 30*1000})})
        } else message.channel.send(new Discord.MessageEmbed()
                .setDescription(`O servidor não está online no momento. 😥`)
                .setFooter(`CislaV3!`)
                .setColor('#9900cc')
            ).then(msg => {msg.delete({timeout: 30*1000}); message.delete({timeout: 30*1000})})


    })
}

function removeColorCode(text) {
    return text.replace(/(§\S[0-9][a-f][A-F])/g, '')
}