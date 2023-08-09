const fs = require('fs');

// handles flatfile reading from ./flatfiles
module.exports = async function ReadFlats(message) {
    msg = message.content.split(" ")
    word = msg[0].replace('!', '');
    fs.readFile(`./flatfiles/${word}.txt`, `utf8`, (err, data) => {
        if (err) {
            return
        }
        message.channel.send(data)
    })
}
