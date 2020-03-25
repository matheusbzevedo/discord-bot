const ytdl = require('ytdl-core'),
    search = require('yt-search'),
    Discord = require('discord.js');

exports.run = (client, message, args) => {

    console.log(message.guild);
    if (!message.member.voiceChannel) return message.reply('Entre em um canal de voz.');
    if (message.guild.me.voiceChannel) return message.reply('Já estou sendo utilizado');

    let pesquisa = args.join(' ');

    if (!pesquisa) return message.reply('Você não digitou um vídeo válido.');

    search(pesquisa, async (error, response) => {
        if (error) console.log(error);

        const video = response.videos[0];

        const con = await message.member.voiceChannel.join();
        const tocar = await con.playStream(ytdl(video.url, { filter: 'audioonly' }));

        tocar.on('end', () => {
            message.channel.send('A música acabou, flw abraço!');
            message.member.voiceChannel.leave();
        });

        const embed = Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`Tocando agora: ${video.title}`)
        .setURL(`https://www.youtube.com${video.url}`)
        .setDescription(`Duração: ${video.duration.timestamp}`)
        .setColor('#0099ff');

        message.channel.send(embed);
    });
};