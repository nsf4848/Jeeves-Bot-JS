//don't remove hideLinkedEmbed, needed to get hyperlink to work (will faill without)
const Parser = require('rss-parser');
const { hyperlink, hideLinkEmbed, time } = require('@discordjs/builders');

//gets and formats rss feeds and outputs to the games-news channel only. daily run.
module.exports = async function RSSFeed(bot) {
    let parser = new Parser();
    let kotaku = await parser.parseURL('https://kotaku.com/rss');
    let pcgames = await parser.parseURL('https://www.pcgamesn.com/mainrss.xml');
    const newsChan = '111'

    kotaku.items.forEach(item => {
        if (item.categories.includes('windows games')) {
            var url = item.link;
            var link = hyperlink('From Kotaku', url);
            bot.channels.cache.get(newsChan).send(link);
        }

    })

    pcgames.items.forEach(item => {
        if (item.content.includes('/review')) {
            var url = item.link;
            var link = hyperlink('From PCGames', url);
            bot.channels.cache.get(newsChan).send(link);
        }

    })
}