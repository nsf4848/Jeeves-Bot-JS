//command handler for Jeeves. triggered by "!" before command - ie: !help
const config = require('./Config.env');
const lib = require('./functions/index.js');
const { joinVoiceChannel } = require('@discordjs/voice');


module.exports = async function gotMessage(message,bot) {
    const args = message.content.substring(config.PREFIX.length).split(" ").shift();
    const ARGS = args.toLowerCase();

    switch (ARGS) {
        case "delete":
            lib.deleteInvites(message, bot)
            break;
        case "disconnect":
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
            });
            connection.destroy();
            break;
        case "invite": lib.Invite(message, bot)
            break;
        case "join":
            try {
                joinVoiceChannel({
                    channelId: message.member.voice.channel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                    selfDeaf: false,
                });
            } catch (error) {
                return (0);
            }
            break;
        case "member": lib.MakeMember(message, bot)
            break;
        case "meme": lib.meme(message, bot)
            break;
        case "poll": lib.Poll(message, bot)
            break;
        case "ping": //pings is between discord server and user - not super useful, but simple
            m = await message.channel.send("Ping?");
            m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`)
            break;
        case "status": lib.status(message)
            break;
        case "forecast": lib.forecast(message)
            break;
        case "weather": lib.weather(message)
            break;   
		default: lib.ReadFlats(message);
    }
}