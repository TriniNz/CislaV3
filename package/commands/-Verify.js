const fs = require('fs'),
    path = require("path"),
    Captcha = require("@haileybot/captcha-generator");

exports.run = async (Discord, client, message, args, savetocaptcha) => {

    let Captcha_RoleADD = '735291847789772885',
        Captcha_RoleREMOVE = '735290995985612802',
        server_invite = 'https://discord.gg/BKYt2h5',
        Captcha_ChannelLOG = '735661813882159244';

    let settcaptcha = new Captcha();
    settcaptcha.PNGStream.pipe(fs.createWriteStream(path.join(__dirname, `generateCaptcha.png`)));

    let msg = await message.channel.send("Escreva os caracteres em preto encontrados na imagem para ser verificado!",
    new Discord.MessageAttachment(settcaptcha.PNGStream, "captcha.png"))

    let collector = await msg.channel.createMessageCollector(m => message.author.id == m.author.id, {time: 30*1000})

    collector.on('collect', c => {

        if(c.content.toLowerCase() == settcaptcha.value.toLowerCase()) {

            client.guilds.cache.get('735278653600170024').members.cache.get(message.author.id).roles.add(Captcha_RoleADD).then(() => {
                client.guilds.cache.get('735278653600170024').members.cache.get(message.author.id).roles.remove(Captcha_RoleREMOVE);

                message.channel.send("✅ | Você se registrou com sucesso.")

                client.guilds.cache.get('735278653600170024').channels.cache.get(Captcha_ChannelLOG).send(new Discord.MessageEmbed()
                    .setFooter(`✅ | ${message.author.username} (${message.author.id}) registrou-se.`)
                    .setColor('#9900cc')
                    .setTimestamp()
                );

            });

    } else {

        message.channel.send('❎ | Você errou e foi kickado do servidor. Tente novamente com este invite: ' + server_invite).then(() => client.guilds.cache.get('735278653600170024').members.cache.get(message.author.id).kick())

    }

    })
}