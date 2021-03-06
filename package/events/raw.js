exports.run = async (Discord, client, raw) => {

    let Ticket_MessageID = "754652899728031784",
        Ticket_CategoryID = "753953967305916546",
        Ticket_ChannelLogsID = "754654739911934002",
        Ticket_EveryoneID = "735278653600170024",
        Ticket_EmojiList = ["🛒","⚙️","🔑","📨","🤖","💡"];

    if(raw.t == "MESSAGE_REACTION_ADD") {
        let Guild = client.guilds.cache.get('735278653600170024'),
            Author = Guild.members.cache.get(raw.d.user_id);

        //Sistema de TICKETS.
        let checkExistChannel = Guild.channels.cache.find(c => c.topic && c.topic.includes(Author.user.id))
        if(checkExistChannel && raw.d.emoji.name == "❎" && checkExistChannel.id == raw.d.channel_id) checkExistChannel.delete().then(() => {
            Guild.channels.cache.get(Ticket_ChannelLogsID).send(new Discord.MessageEmbed()
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

            Guild.channels.cache.get(Ticket_ChannelLogsID).send(new Discord.MessageEmbed()
                .setFooter(`✅ | ${Author.user.username} (${Author.id}) iniciou um ticket sobre ${indetify(raw.d.emoji.name).split('-')[1]}`)
                .setColor('#9900cc')
                .setTimestamp()
            );

            setTimeout(() => {

                if(CH && CH.messages.cache.size == 2) CH.delete().then(() => {
                    Guild.channels.cache.get(Ticket_ChannelLogsID).send(new Discord.MessageEmbed()
                        .setFooter(`✅ | Um ticket de ${Author.user.username} (${Author.id}) sobre ${indetify(raw.d.emoji.name).split('-')[1]} foi encerrado por inatividade.`)
                        .setColor('#9900cc')
                        .setTimestamp()
                    );
                })
            }, 5*1000*60)
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
            Guild.channels.cache.get(Ticket_ChannelLogsID).send(new Discord.MessageEmbed()
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