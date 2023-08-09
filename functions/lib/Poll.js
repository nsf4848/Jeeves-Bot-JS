const { MessageActionRow, MessageButton } = require('discord.js');
const { jsonRead } = require('./jsonFile');

const createPoll = async (channel, message) => {
    const pollEmbed = {color: '#0099ff',title: 'Poll',description: message,
        fields: [{ name: 'Yes', value: '0', inline: true },
            { name: 'No', value: '0', inline: true },
        ]};
    const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('yes').setLabel('Yes').setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('no').setLabel('No').setStyle('DANGER')          
    ); 
    const pollMessage = await channel.send({ embeds: [pollEmbed], components: [row] });
    return pollMessage;
};     

module.exports = async function Poll(message) {
    let msg = message.content.split(" ").slice(1).join(" ");
    if (msg[0] == null) { message.channel("Please provide a question for the poll"); return; }
    //jfile = jsonRead('polls');
    //console.log(jfile);
    
    createPoll(message.channel, msg);
    //jPollWrite(msg, message.member.id, true);
}
