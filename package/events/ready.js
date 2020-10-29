const Request = require('request');

exports.run =  async (Discord, client) => {

    setTimeout(() => {console.log(`Instancia iniciada em ${client.user.username}. Resposta: ${Math.floor(client.ws.ping)}MS.`)}, 3*1000)

    setInterval(() => {

        let totalSeconds = (client.uptime / 1000),
            uptime_d = Math.floor(totalSeconds / 86400),
            uptime_h = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
        let uptime_m = Math.floor(totalSeconds / 60),
            uptime_s = Math.floor(totalSeconds % 60);

        const StatusText = [
            `Atualmente, estamos em beta!`,
            `Achou um bug? Reporte-o para TriniNz#0752`,
            `Já estou há ${uptime_d} dias, ${uptime_h} horas, e ${uptime_m} minutos online!`
        ]

        const rndText = StatusText[Math.floor(Math.random() * StatusText.length)];
        client.user.setPresence({status: "iddle", activity: {name: rndText, type: "STREAMING", url: `https://www.twitch.tv/ztrininz_`}})

    }, 15*1000)

    TabbleInfo(client, '764198166866034749', '764198198163275806', '764198297543376957', '764198036917190656', '735278653600170024')
    setInterval(() => TabbleInfo(client, '764198166866034749', '764198198163275806', '764198297543376957', '764198036917190656', '735278653600170024'), 7*1000*60)
}

function TabbleInfo(client, channelid1, channelid2, channelid3, categoryid, guildID) {

    let ip = 'CislaV3.com.br',
        api = 'http://mcapi.us/server/status?ip=' + ip;


    Request(api, (error, response, body) => {
        body = JSON.parse(body);

        client.guilds.cache.get(guildID).channels.cache.get(categoryid).setName(ip)
        client.guilds.cache.get(guildID).channels.cache.get(channelid1).setName("Membros: " + client.guilds.cache.get(guildID).memberCount)
        client.guilds.cache.get(guildID).channels.cache.get(channelid2).setName("Players: " + body.players.now)
        client.guilds.cache.get(guildID).channels.cache.get(channelid3).setName(`Status: ${body.status ? "Online!" : "Manutenção :("}`)

    })
}
