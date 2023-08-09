const { Client, Intents } = require('discord.js');
const config = require('./Config.env'); //tokens, api keys, and prefix
const ComHandler = require('./Commands.js') //jeeves commands
const lib = require('./functions/index.js'); //Jeeves functions
const Schedule = require('node-schedule');
const bot = new Client({ intents: 32767 });
const { addSpeechEvent } = require("discord-speech-recognition");
const { joinVoiceChannel } = require('@discordjs/voice');
addSpeechEvent(bot);

bot.on("ready", () => {
    console.log("Ready!");
    //RSS Feed for PC game articles
    Schedule.scheduleJob('0 00 16 * * *', function(){
        lib.RSSFeed(bot)
    })
});

//generic message to new invites
bot.on("guildMemberAdd", member => {
    member.send("Welcome!");
});

//main function, also Jeeve's command handler
bot.on("messageCreate", message => {
    bot.user.setActivity("!Help for assistance.", { type: "LISTENING" });
    chk = message.content.charAt(0);  
    if (chk == config.PREFIX) { ComHandler(message, bot) }    
});

//only needed for voice commands 
bot.on("speech", (message) => {     
    try {
        const MSG = message.content.split(" ").shift();     
        if (MSG.toUpperCase() == 'JEEVES') {
            lib.voice.Voice(message, bot)
        }
    } catch (error) {
        return (0); //startsWith sometimes throws an error, unclear why
    }
});

bot.on("voiceStateUpdate", (oldState, newState) => {
    const Guild = bot.guilds.cache.get("000")
    const Member = Guild.members.cache.get("111")

    if (Member.voice.channel) {
        if (oldState.channelID !== oldState.guild.me.voice.channelID || newState.channel) {
            return (0); //If it's not the channel the bot's playing in
        }
        if ((oldState.channel.members.size - 1) <= 1) {            
            const connection = joinVoiceChannel({
                channelId: Member.voice.channel.id, 
                guildId: Member.guild.id,
            });
            connection.destroy();
        }
    }
});

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const pollMessage = interaction.message;
    const pollEmbed = pollMessage.embeds[0];
    const pollOptions = pollEmbed.fields;
    const selectedOption = interaction.customId.toLowerCase();

    if (selectedOption === 'yes') {
        const yesOption = pollOptions.find((option) => option.name === 'Yes');
        yesOption.value = String(Number(yesOption.value) + 1);
    } else if (selectedOption === 'no') {
        const noOption = pollOptions.find((option) => option.name === 'No');
        noOption.value = String(Number(noOption.value) + 1);
    }

    pollEmbed.fields = pollOptions;
    await pollMessage.edit({ embeds: [pollEmbed] });
    interaction.deferUpdate();

});  

bot.login(config.token); 