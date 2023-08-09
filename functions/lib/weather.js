const config = require('/jeeves/Config.env'); //tokens, api keys, and prefix
const request = require('request'); //weather and forecast functions
const { hyperlink, hideLinkEmbed, time } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

//takes a zip, converts to log/lat, and gives current weather only.
async function weather(message) {
    let word = message.content.split(" ")[1];
    if ((word == null) || (isNaN(word))) { message.reply('Please provide a zip.'); return; };
    if ((word).length != 5) { message.reply('Please make sure your zip is 5 characters.'); return; };

    let apiloc = `http://api.openweathermap.org/geo/1.0/zip?zip=${word}&appid=${config.ow_key}`
    
    //retrieve data from api, into body
    request(apiloc, (error, response, body) => {
        var data = JSON.parse(body);
        if (data.cod == '404') { message.reply('Invalid zip or no information available.'); return; }
        name = data.name;
        let site = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly&units=imperial&appid=${config.ow_key}`

        request(site, (error, response, body) => {
            var data = JSON.parse(body);
            if (data.cod == '404') { message.reply('No information available.'); return; }

            //split each day into it's own object
            let dayone = data.daily[0]; //current day            

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor({ name: 'Current Weather' })
                .addFields(
                    { name: "Location", value: `${name}`, inline: true },
                    { name: "Current Temp", value: `   ` + `${data.current.temp}` + `\u00B0 F` + '\n\u200b', inline: true },
                    { name: "Min", value: `${dayone.temp.min}` + `\u00B0 F`, inline: false },
                    { name: "Max", value: `${dayone.temp.max}` + `\u00B0 F` + '\n\u200b', inline: true }
            )

            message.channel.send({ embeds: [embed] });
        })
    })
}


//takes a zip, converts to log/lat, and gives current weather and 5 day forecast.
async function forecast(message) {

    let word = message.content.split(" ")[1];
    if ((word == null) || (isNaN(word))) { message.reply('Please provide a zip.'); return; };
    if ((word).length != 5) { message.reply('Please make sure your zip is 5 characters.'); return; };

    let apiloc = `http://api.openweathermap.org/geo/1.0/zip?zip=${word}&appid=${config.ow_key}`

    //retrieve data from api, into body
    request(apiloc, (error, response, body) => {
        var data = JSON.parse(body);
        if (data.cod == '404') { message.reply('Invalid zip or no information available.'); return; }
        name = data.name;
        let site = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly&units=imperial&appid=${config.ow_key}`

        request(site, (error, response, body) => {
            var data = JSON.parse(body);
            if (data.cod == '404') { message.reply('No information available.'); return; }

            //split each day into it's own object
            let dayone = data.daily[0]; //current day
            let daytwo = data.daily[1]; //tomorrow
            let daythree = data.daily[2]; //etc
            let dayfour = data.daily[3];
            let dayfive = data.daily[4];
            let daysix = data.daily[5];


            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor({ name: 'Current Weather' })
                .addFields(
                        { name: "Location", value: `${name}`, inline: true },
                        { name: "Current Temp", value: `   ` + `${data.current.temp}` + `\u00B0 F` + '\n\u200b', inline: true },
                        { name: "Min", value: `${dayone.temp.min}` + `\u00B0 F`, inline: false },
                        { name: "Max", value: `${dayone.temp.max}` + `\u00B0 F` + '\n\u200b', inline: true },
                        { name: "Five Day Forcast", value: `-------------------------------`, inline: false },
                        { name: time(daytwo.dt, 'D'), value: '\n\u200b', inline: false },
                        { name: "Min", value: `${daytwo.temp.min}` + `\u00B0 F`, inline: true },
                        { name: "Max", value: `${daytwo.temp.max}` + `\u00B0 F` + '\n\u200b', inline: true },
                        { name: time(daythree.dt, 'D'), value: '\n\u200b', inline: false },
                        { name: "Min", value: `${daythree.temp.min}` + `\u00B0 F`, inline: true },
                        { name: "Max", value: `${daythree.temp.max}` + `\u00B0 F` + '\n\u200b', inline: true },
                        { name: time(dayfour.dt, 'D'), value: '\n\u200b', inline: false },
                        { name: "Min", value: `${dayfour.temp.min}` + `\u00B0 F`, inline: true },
                        { name: "Max", value: `${dayfour.temp.max}` + `\u00B0 F` + '\n\u200b', inline: true },
                        { name: time(dayfive.dt, 'D'), value: '\n\u200b', inline: false },
                        { name: "Min", value: `${dayfive.temp.min}` + `\u00B0 F`, inline: true },
                        { name: "Max", value: `${dayfive.temp.max}` + `\u00B0 F` + '\n\u200b', inline: true },
                        { name: time(daysix.dt, 'D'), value: '\n\u200b', inline: false },
                        { name: "Min", value: `${daysix.temp.min}` + `\u00B0 F`, inline: true },
                        { name: "Max", value: `${daysix.temp.max}` + `\u00B0 F` + '\n\u200b', inline: true }
            )
            message.channel.send({ embeds: [embed] });
        })
    })
}

module.exports = { forecast, weather }