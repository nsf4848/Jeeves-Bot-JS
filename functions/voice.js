const { joinVoiceChannel } = require('@discordjs/voice');
const deleteInvites = require('./lib/deleteInvites');
const Invite = require('./lib/Invite')

async function Voice(message,bot) {
	const msg = message.content.split(" ").slice(1);
	const Msg = msg.map(map => map.toUpperCase());
	//mini handler for various voice commands, functions below
	//console.log(Msg);
	//console.log(Msg.includes("DISCONNECT"));

	switch (true) {
		case Msg.includes("DISCONNECT"):
			disconnect(message);
			break;
		case Msg.includes("INVITE"):
			Invite(message,bot);
			break;
		case Msg.includes("DELETE"):
			deleteInvites(message,bot);
			break;
	}
}

//functions specific to voice, may move to files if the list becomes too large
async function disconnect(message) {
	const connection = joinVoiceChannel({
		channelId: message.member.voice.channel.id,
		guildId: message.guild.id,		
	});
	connection.destroy();
}

module.exports = { Voice }