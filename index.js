require('dotenv').config();

const express = require('express')(),
    cors = require('cors'),
    Discord = require('discord.js'),
    client = new Discord.Client();

express.use(cors());
express.get('/', (request, response) => response.status(200).json({bot: 'online'}));
express.listen(process.env.PORT || 3000, () => console.log(`Servidor rodando na porta: ${process.env.PORT || 3000}`));


client
.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    if (message.content.toLowerCase().includes('boa mito')) {
        let boaMito = new Discord.MessageEmbed()
        .setImage('https://media1.giphy.com/media/26gsspfbt1HfVQ9va/giphy.gif');

        return message.channel.send(boaMito);
    }

    if (!message.content.toLowerCase().startsWith(process.env.PREFIX)) return;

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
.login(process.env.DISCORD_TOKEN);