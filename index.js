require('dotenv').config();

const Discord = require('discord.js'),
    client = new Discord.Client();

client
.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(process.env.prefix)) return;

    let comando = message.content.toLowerCase().split(' ')[1];
    let args = message.content.split(' ').slice(1);

    try {
        let arquivoComando = require(`./commands/${comando}.js`)
        arquivoComando.run(client, message, args);
    } catch (error) {
        console.log(error);
    }
})
.on('ready', () => {
    console.log(`${client.user.username} iniciado com sucesso!`);
})
.login(process.env.discord_token);