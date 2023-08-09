const exec = require('child_process').exec;

/*pull back running status of each game - if possible
the issue is that if there are more than one server by that name
then it's only able to see if one is active */
module.exports = async function status(message) {
    //first number is the PID in task scheduler, the second is the name we are calling it in the message
    var servers = [['3420', 'Conan Exiles'], ['1824', '7 Days To Die'], ['1416', 'Empyriion Server 1'], ['1128', 'Empyriion Server 2'], ['4152', 'ZDeamon Servers']];

    const isRunning = (query, cb) => {
        let cmd = 'tasklist';

        exec(cmd, (err, stdout) => {
            cb(stdout.toLowerCase().indexOf(query) > -1);
            //console.log(stdout);
        });
    }

    servers.forEach(function (item) {
        isRunning(item[0], (status) => {
            if (status) {
                status = 'Running';
            } else {
                status = 'Down';
            }
            message.channel.send(`${item[1]} is ${status}`);
        })
    })
}