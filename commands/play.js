const ytdl = require('ytdl-core'),
    search = require('yt-search'),
    Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply('Entre em um canal de voz.');
    if (message.guild.me.voice.channel) return message.reply('Já estou sendo utilizado');

    let pesquisa = args.join(' ');

    if (!pesquisa) return message.reply('Você não digitou um vídeo válido.');

    search(pesquisa, async (error, response) => {
        if (error) console.log(error);

        const video = response.videos[0];

        const con = await message.member.voice.channel.join();
        const tocar = await con.play(ytdl(video.url));

        tocar.on('end', () => {
            message.channel.send('A música acabou, flw abraço!');
            message.member.voice.channel.leave();
        });

        console.log(video.url);
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`Tocando agora: ${video.title}`)
        .setURL(video.url)
        .setDescription(`Duração: ${video.duration.timestamp}`)
        .setColor('#0099ff');

        message.channel.send(embed);
    });
};