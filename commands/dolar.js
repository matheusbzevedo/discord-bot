const axios = require('axios'),
    Discord = require('discord.js'),
    imageSuco = `https://scontent.fcgh19-1.fna.fbcdn.net/v/t31.0-8/p960x960/29983499_1621071411341460_1972054344635291183_o.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=K3yuHbM95dUAX9_W5VR&_nc_ht=scontent.fcgh19-1.fna&_nc_tp=6&oh=4d432abea20e948e98fdfd88c5719243&oe=5E9F25D7`;

exports.run = async (client, message, args) => {
    const dolar = await axios.get('https://economia.awesomeapi.com.br/json/all/USD-BRL,BTC-BRL');

    if (args[1] == 'suco') {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('DOLAR BOY')
        .setURL('https://www.facebook.com/ayrton.carlos.733')
        .setAuthor('Suco "dolar" de Fruta', imageSuco, 'https://www.facebook.com/ayrton.carlos.733')
        .setDescription('Saiba como ganhar dólar agora mesmo')
        .addFields(
            { name: 'Valor do dólar', value: `R$ ${dolar.data.USD.bid}`, inline: true },
            { name: 'Variação do dólar', value: `${dolar.data.USD.varBid}`, inline: true },
            { name: 'Maior valor atingido hoje', value: `${dolar.data.USD.high}`, inline: true },
        )
        .setImage('https://cdn.discordapp.com/attachments/650707174326272011/691990650840809573/unknown.png')
        .setTimestamp()
        .setFooter('VENHA QUEBRAR A BANCA, COM O MAIOR GANHADO DE DÓLAR DO BRASIL!');

        return message.channel.send(embed);
    }

    return message.channel.send(`\n
        O dólar está valendo: R$ ${dolar.data.USD.bid}, com variação de: ${dolar.data.USD.varBid}
        O bitcoin está valendo: R$ ${dolar.data.BTC.bid}, com variação de: ${dolar.data.BTC.varBid}
    `);
};