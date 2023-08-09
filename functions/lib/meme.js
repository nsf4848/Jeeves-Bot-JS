const config = require('/jeeves/Config.env');
const GphApiClient = require("giphy-js-sdk-core");
const giphy = GphApiClient(config.gtoken);

// ramdom meme generator, takes a search word, or nothing at all
//word[1] is the 2nd word in the string "!MEME" being the first.
module.exports = async function meme(message, bot) {
    let word = message.content.split(" ").slice(1).join(" ");
    if (word[0] == null) {
        word = "random"
    }
   
    giphy.search("gifs", { q: word })
        .then(response => {
            try {
                var totalResponse = response.data.length;
                var responseIndex = Math.floor(Math.random() * 100 + 1) % totalResponse;
                var responseFinal = response.data[responseIndex];           
          
                message.channel.send({ files: [responseFinal.images.fixed_height.url] });
            }
            catch (response) {                
               message.channel.send({ files: ["/jeeves/images/shut-up-james.jpg"] });                
            }
        })
}