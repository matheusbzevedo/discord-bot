exports.run = async (client, message, args) => {
    await message.member.voice.channel.leave();
};