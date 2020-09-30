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
}