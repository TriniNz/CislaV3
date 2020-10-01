const Discord = require('discord.js');
const client = new Discord.Client();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const cmdadapter = new FileSync('./package/commands/-commands.json');
const dbcmd = low(cmdadapter);

require('dotenv').config();
const active = true;

console.log('Iniciando...\n\n');


const express = require("express");
const app = express();

app.use(express.static("/app/package/sitehost/public"));

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/package/sitehost/views/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Site iniciado na porta: " + listener.address().port + "\n\n");
});


client.on('ready', () => {
    try {
        require("./package/events/ready.js").run(Discord, client);   
    } catch (err) {
        console.log(err + "\n\x1b[37m Houve um erro no evento Ready.")
    }
});

client.on('guildMemberAdd', member => {
    try {
        require("./package/events/guildMemberAdd.js").run(Discord, client, member);   
    } catch (err) {
        console.log(err + "\n\x1b[37m Houve um erro no evento guildMemberAdd.")
    }
});

client.on('guildMemberRemove', member => {
    try {
        require("./package/events/guildMemberRemove.js").run(Discord, client, member);   
    } catch (err) {
        console.log(err + "\n\x1b[37m Houve um erro no evento guildMemberRemove.")
    }
})

client.on('message', message => {
    try {
        require("./package/events/message.js").run(Discord, client, message, dbcmd);   
    } catch (err) {
        console.log(err + "\n\x1b[37m Houve um erro no evento message.")
    }
});

client.on('raw', raw => {
    try {
        require("./package/events/raw.js").run(Discord, client, raw);   
    } catch (err) {
        console.log(err + "\n\x1b[37m Houve um erro no evento raw.")
    }
});


if(active) client.login(process.env.logintoken);
