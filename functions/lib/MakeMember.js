//makes temp member a full member IF request is from admin, else it pushes request to a special admin channel for review
module.exports = async function MakeMember(message, bot) {
    msg = message.content.split(" ").slice(1);
    word = msg.join().replace(/,/g, " "); //message.content.split(" ").slice(1);
    if (word == null) {
        message.reply('Please enter only the temp members name when asking for full membership.');
    } else if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.reply('You do not have enough permission to make someone a member.');
        message.reply('Your request will be sent to the Admins for review.');
        bot.channels.cache.get('111').send(`${message.author.username} has requested that ${word} be given a member role.`);
    } else {
        guild = bot.guilds.cache.get('000'); //cache the guild
        let memberID = bot.users.cache.find(user => user.username == word).id; //get id
        let member = guild.members.cache.get(memberID); //get guildmember info
        if (member.roles.cache.some(role => role.id === '000')) {
            message.reply(`${word} is already a member.`)
        } else {
            member.roles.add('000')// apply role   
            message.reply('Member added!');
            bot.channels.cache.get('111').send(`${message.author.username} has given ${word} a member role.`);
        }
    }
}