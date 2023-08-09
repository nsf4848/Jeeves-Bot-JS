const deleteInvites = require('./lib/deleteInvites');
const MakeMember = require('./lib/MakeMember');
const meme = require('./lib/meme');
const ReadFlats = require('./lib/ReadFlats');
const { jsonRead, jpollWrite } = require('./lib/jsonFile');
const Invite = require('./lib/Invite');
const RSSFeed = require('./lib/RSSFeed');
const status = require('./lib/status');
const Poll = require('./lib/Poll');
const voice = require('./voice');
const { forecast, weather } = require('./lib/weather');

module.exports = {
    deleteInvites,
    forecast,
    MakeMember,
    meme,
    Poll,
    ReadFlats,
    jsonRead,
    jpollWrite,
    Invite,
    RSSFeed,
    status,
    voice,
    weather    
}