exports.run = async (Discord, client, raw) => {

    let Ticket_MessageID = "754652899728031784",
        Ticket_CategoryID = "753953967305916546",
        Ticket_ChannelLogsID = "754654739911934002",
        Ticket_EveryoneID = "735278653600170024",
        Ticket_EmojiList = ["🛒","⚙️","🔑","📨","🤖","💡"];

    let Captcha_MessageID = "754595685298339850",
        Captcha_RoleADD = '735291847789772885',
        Captcha_RoleREMOVE = '735290995985612802',
        Captcha_ChannelLOG = '735661813882159244';

    if(raw.t == "MESSAGE_REACTION_ADD") {
        let Guild = client.guilds.cache.get('735278653600170024'),
            Author = Guild.members.cache.get(raw.d.user_id);

        //Sistema de Captcha.
        if(Author.roles.cache.get(Captcha_RoleREMOVE) && raw.d.message_id == Captcha_MessageID) Author.roles.add(Captcha_RoleADD).then(() => {
            Author.roles.remove(Captcha_RoleREMOVE);
            
            Author.send(new Discord.MessageEmbed()
                .setFooter("✅ | Você se registrou com sucesso.")
                .setColor('#9900cc')
                .setTimestamp()
            ); 

            Guild.channels.cache.get(Captcha_ChannelLOG).send(new Discord.MessageEmbed()
                .setFooter(`✅ | ${Author.user.username} (${Author.id}) registrou-se.`)
                .setColor('#9900cc')
                .setTimestamp()
            );
        }).catch(err => {
            
            Author.send(new Discord.MessageEmbed()
                .setFooter("❎ | Houve um erro ao realizar o registro.")
                .setColor('#9900cc')
                .setTimestamp()
            ); 

            Guild.channels.cache.get(Captcha_ChannelLOG).send(new Discord.MessageEmbed()
                .setFooter(`❎ | Houve um erro ao realizar o registro de ${Author.user.username} (${Author.id})`)
                .setColor('#9900cc')
                .setTimestamp()
            );
        })
        //Sistema de Captcha.

        //Sistema de TICKETS.
        let checkExistChannel = Guild.channels.cache.find(c => c.topic && c.topic.includes(Author.user.id))
        if(checkExistChannel && raw.d.emoji.name == "❎" && checkExistChannel.id == raw.d.channel_id) checkExistChannel.delete().then(() => {
            Guild.channels.cache.get(Captcha_ChannelLOG).send(new Discord.MessageEmbed()
                .setFooter(`✅ | ${Author.user.username} (${Author.id}) encerrou seu ticket.`)
                .setColor('#9900cc')
                .setTimestamp()
            );
        });

        if(!Ticket_EmojiList.includes(raw.d.emoji.name)) return;
        if(raw.d.message_id != Ticket_MessageID) return;
        if(checkExistChannel) return;

        let CH = await Guild.channels.create(`${raw.d.emoji.name}-${Author.user.username}`, {
            type: "text", 
            topic:`${raw.d.emoji.name} Ticket-Support | ID: ${Author.user.id}`, 
            parent: Ticket_CategoryID,
            permissionOverwrites: [{
                id: Author.user.id,
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
            }, {
                id: Ticket_EveryoneID,
                deny: ['VIEW_CHANNEL','SEND_MESSAGES']
            }]
        });

        await CH.send(new Discord.MessageEmbed()
            .setTitle(`${indetify(raw.d.emoji.name)}`)
            .setDescription(`Você solicitou um ticket de suporte. Aguarde, superiores já foram contatados para lhe ajudar.\n Caso você não envie mensagens durante 5 minutos após o inicio deste ticket, ele será encerrado por inatividade.\n Para encerrar este ticket, reaja com :negative_squared_cross_mark:.`)
            .setFooter(`CislaV3!`)
            .setColor('#9900cc')
            .setTimestamp()
        ).then(async msg => {
            await msg.pin()
            await msg.react('❎');

            Guild.channels.cache.get(Captcha_ChannelLOG).send(new Discord.MessageEmbed()
                .setFooter(`✅ | ${Author.user.username} (${Author.id}) iniciou um ticket sobre ${indetify(raw.d.emoji.name).split('-')[1]}`)
                .setColor('#9900cc')
                .setTimestamp()
            );
        })
        //Sistema de TICKETS.
    }

    if(raw.t == "MESSAGE_REACTION_REMOVE") {

        let Guild = client.guilds.cache.get('735278653600170024'),
            Author = Guild.members.cache.get(raw.d.user_id);

        //Sistema de TICKETS.
        if(!Ticket_EmojiList.includes(raw.d.emoji.name)) return;
        if(raw.d.message_id != Ticket_MessageID) return;

        let checkExistChannel = Guild.channels.cache.find(c => c.topic && c.topic.includes(Author.user.id))

        if(checkExistChannel && checkExistChannel.topic.substr(0,2) == raw.d.emoji.name) checkExistChannel.delete().then(() => {
            Guild.channels.cache.get(Captcha_ChannelLOG).send(new Discord.MessageEmbed()
                .setFooter(`✅ | ${Author.user.username} (${Author.id}) encerrou seu ticket.`)
                .setColor('#9900cc')
                .setTimestamp()
            );
        })
        //Sistema de TICKETS.
    }

}

//Sistema de TICKETS
function indetify(emoji) {
    if(emoji == '🛒') return `🛒 Ticket - Compras`;
    if(emoji == '⚙️') return `⚙️ Ticket - Reportar Bugs`;
    if(emoji == '📨') return `📨 Ticket - Dúvidas Gerais`;
    if(emoji == '🔑') return `🔑 Ticket - Solicitar Unban`;
    if(emoji == '💡') return `💡 Ticket - Sugestões`;
}