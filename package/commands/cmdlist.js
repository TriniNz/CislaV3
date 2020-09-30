exports.run = async (Discord, client, message, args) => {

    let list = require('./-commands.json'),
        prefix = "!",
        pag = 0,
        textCmds = [];

    for(var i = 0; i < list.Commands.length; i++) {
        
        let edit = "'" +  list.Commands[i].aliases + "'";
        edit = edit.replace(/'+/g, '*');
        edit = edit.replace(/,+/g, ` - ${prefix}`);
    
        textCmds.push(`*${i + 1}*. **${list.Commands[i].name}**\n⠀• **Descrição**: ${list.Commands[i].desc}\n⠀• **Utilização**: ${prefix}${list.Commands[i].uso}\n⠀• **Metodos de uso**: ${prefix}${edit}\n\n`)
    }

    message.channel.send(new Discord.MessageEmbed()
        .setFooter('Garanta que sua DM esteja aberta. Lhe enviarei uma mensagem lá!')
        .setColor('#9900cc')
    ).then(firstMessage => {

        firstMessage.delete({timeout: 15*1000}); 
        message.delete({timeout: 15*1000});

        message.member.send(new Discord.MessageEmbed()
            .setDescription(`Atualmente tenho ${list.Commands.length} comandos registrados. Entre eles são:\n${subDividir(textCmds, 5)[pag]}`)
            .setFooter(`CislaV3! • ${pag+1}/${subDividir(textCmds, 5).length}`)
            .setColor('#9900cc')
        ).then(async pvMessage => {
            await pvMessage.react('↩️');
            await pvMessage.react('↪️');   

            let collector = pvMessage.createReactionCollector((reaction, user) => ['↩️','↪️'].includes(reaction.emoji.name) && user.id == message.author.id, {time: 60*1000});

            collector.on('collect', collected => {

                if(collected.emoji.name == "↩️") {
                    if(subDividir(textCmds, 5)[pag - 1]) pag--

                    pvMessage.edit(new Discord.MessageEmbed()
                        .setDescription(`Atualmente tenho ${list.Commands.length} comandos registrados. Entre eles são:\n${subDividir(textCmds, 5)[pag]}`)
                        .setFooter(`CislaV3! • ${pag+1}/${subDividir(textCmds, 5).length}`)
                        .setColor('#9900cc')
                    )

                } else if(collected.emoji.name == "↪️") {
                    if(subDividir(textCmds, 5)[pag + 1]) pag++

                    pvMessage.edit(new Discord.MessageEmbed()
                        .setDescription(`Atualmente tenho ${list.Commands.length} comandos registrados. Entre eles são:\n${subDividir(textCmds, 5)[pag]}`)
                        .setFooter(`CislaV3! • ${pag+1}/${subDividir(textCmds, 5).length}`)
                        .setColor('#9900cc')
                    )
                }
            })

        })

    })


}

function subDividir(array, quantidade) { // Essa é uma função que divide um array em um array, basicamente você vai passar 2 paramêtros o array a ser divido e a quantiade máxima de elementos em cad array, e ele vai divdir esse array e vai retornar um array com esse array divido, se tu não entender só testa a função que tu vai entender
    let index = 0;
    let counter = 0;
    let newArray = [];
        newArray.push([]);
        while(newArray[index].length <= quantidade && array[counter]) {
            newArray[index].push(array[counter]);
            counter++;
            if(newArray[index].length + 1 > quantidade) {
                index++;
                newArray.push([])
            }
        }
        for(let i in newArray) {
            if(newArray[i].length === 0) {
                newArray.splice(i, 1)
            }
        }
    return newArray
}