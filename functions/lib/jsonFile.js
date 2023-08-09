const fs = require('fs');


// handles flatfile reading from ./flatfiles
async function jsonRead(jFile) {
    //msg = message.content.split(" ")
    //word = msg[0].replace('!', '');
    console.log(jFile);
    fs.readFile(`./json/${jFile}.txt`, `utf8`, (err, jsonString) => {
        if (err) {
            console.log("Error reading file. ", err, " ", jFile);
            return
        }

        try {
            const customer = JSON.parse(jsonString);
            console.log(customer.address);
        } catch (err) {
            console.log("Error reading Json string. " ,err, " in ",jFile);
        }
    });
}

/*
 * specific to writing poll data. tracking poll name, member id and timestamp for when the poll was created
 * May add ability to for timed Polls
 * At least gives us a way to delete polls and to see if user has already voted
 */

async function jPollWrite(pollname, member, author) {
    const odate = new Date()
    if (author = true) {
        ddate = odate.toDateString();
    } else {
        ddate = "NULL"
    }

        const pData = {
            name: pollname,
            id: member.id,
            create_dt: ddate,
        }

        const jsonString = JSON.stringify(pData)
        fs.writeFile(`./json/poll.txt`, (jsonString, err) => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
    }

module.exports = { jsonRead, jPollWrite }