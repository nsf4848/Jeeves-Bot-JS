
//deletes all open invite codes
module.exports = async function deleteInvites(message, bot) {
    const Guild = bot.guilds.cache.get("000"); // Getting the guild.
    let memberID = message.member.id; //get id
    const Member = Guild.members.cache.get(memberID); // Getting the member.

    message.guild.invites.fetch().then(invites => {        
        invites.each(i => i.delete())
    })
    
    if (Member.voice.channel) {
        message.member.send("All open invites are now deleted.")
    } else {
        message.channel.send("All open invites are now deleted.")
    }
}