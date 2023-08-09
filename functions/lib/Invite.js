
//makes a temporary invite code
module.exports = async function Invite(message,bot) {
    const Guild = bot.guilds.cache.get("000"); // Getting the guild.
    let memberID = message.member.id; //get id
    const Member = Guild.members.cache.get(memberID); // Getting the member.
    let invite = await message.channel.createInvite
        ({ temporary: true, maxUses: 1 },
            `Requested with command by ${message.author.tag}`
        )
        .catch(console.log);
    
    if (Member.voice.channel) {
        message.member.send(invite ? `here's your invite: ${invite}` : "There has been an error during the creation of the invite.");
    } else {
        message.channel.send(invite ? `here's your invite: ${invite}` : "There has been an error during the creation of the invite.");
    }
    
}