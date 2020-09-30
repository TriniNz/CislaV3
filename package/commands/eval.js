exports.run = async (Discord, client, message, args) => {

    if(message.author.id != '429825875467304960') return message.channel.send(new Discord.MessageEmbed()
        .setAuthor("Eval()", client.user.displayAvatarURL())
        .setDescription("Apenas o dono do bot pode utilizar este comando.")
        .setFooter("Eval error")
        .setColor("#ff5050")
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})})
        

    if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
      .setAuthor("Eval()", client.user.displayAvatarURL)
      .setDescription("Nem uma ação definida.")
      .setFooter("Eval error")
      .setColor("#ff5050")
    ).then(Msg => {Msg.delete({timeout:15*1000}); message.delete({timeout:15*1000})})
    
    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    try {

    let code = args.join(" "),
        evaled = eval(code),
        evaledd;
    
    if(typeof evaled !== "string") evaledd = require("util").inspect(evaled);

        message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Eval()", client.user.displayAvatarURL)
            .setDescription("⠀")
            .addField("📥 Code:",`\`\`\`js\n${clean(code)}\`\`\``)
            .addField("📤 Retorno:",`\`\`\`js\n${clean(evaledd)}\`\`\``)
            .addField("⚙ Tipo:",`\`\`\`js\n${typeof(evaled)}\`\`\``,true)
            .addField("⏱ Tempo de resposta:",`\`\`\`js\n-\`\`\``,true)
            .setFooter("Evaled return")
            .setColor("#ff5050")
        ).then(response => {

            let totalSeconds = (response.createdAt - message.createdAt / 1000);
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

        if(response.createdAt - message.createdAt > 1000) {

            response.edit(new Discord.MessageEmbed()
                .setAuthor("Eval()", client.user.displayAvatarURL)
                .setDescription("⠀")
                .addField("📥 Code:",`\`\`\`js\n${clean(code)}\`\`\``)
                .addField("📤 Retorno:",`\`\`\`js\n${clean(evaledd)}\`\`\``)
                .addField("⚙ Tipo:",`\`\`\`js\n${typeof(evaled)}\`\`\``,true)
                .addField("⏱ Tempo de resposta:",`\`\`\`js\n${hours}:${minutes}:${seconds}\`\`\``,true)
                .setFooter("Evaled return")
                .setColor("#ff5050")
            );

        } else {

            response.edit(new Discord.MessageEmbed()
                .setAuthor("Eval()", client.user.displayAvatarURL)
                .setDescription("⠀")
                .addField("📥 Code:",`\`\`\`js\n${clean(code)}\`\`\``)
                .addField("📤 Retorno:",`\`\`\`js\n${clean(evaledd)}\`\`\``)
                .addField("⚙ Tipo:",`\`\`\`js\n${typeof(evaled)}\`\`\``,true)
                .addField("⏱ Tempo de resposta:",`\`\`\`js\n${response.createdAt - message.createdAt}ms\n\`\`\``,true)
                .setFooter("Evaled return")
                .setColor("#ff5050")
            );
        }
    })

    } catch (err) {

    const code = args.join(" ");

    message.channel.send(new Discord.MessageEmbed()
        .setAuthor("Eval()", client.user.displayAvatarURL)
        .setDescription("⠀")
        .addField("Code:",`\`\`\`js\n${clean(code)}\`\`\``)
        .addField("`Erro`:",`\`\`\`js\n${clean(err)}\`\`\``)
        .setFooter("Evaled return")
        .setColor("#ff5050")
    )

    console.log("[Eval error] " + err.name + ": " + err.message)
    }
}