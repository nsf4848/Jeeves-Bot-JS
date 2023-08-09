# Jeeves-Bot-JS
A node JS bot for Discord, using discord.js  ver 13.6

Intent: A bot to handle specific needs, and a little fun. Our Discord server is set to 24 hr invites only, and the only way to remain in the server after that is to be given a role. This way, we could freely invite outsides in to temporarily play games, chat, etc, but not be able to linger longer than desired. Jeeves handles the invites, and role permissions, with admin approval.

PLEASE READ THE README INCLUDED.

Jeeves is currently set to use ! as the prefix.
use !help to see a list of commands in Discord, or goto functions/lib to see them in code.

Current features (in functions/lib folder):
  - Invite - create a 24 hr invite code to your Discord server
  - delete invites - clear any open invite codes in the server
  - make someone a member - if a server member, Jeeves will add a request in your admin channel, if the admin uses this command, it will change the person's role to member.
  - meme - uses the GIPHY API to pull a random meme, based on the word(s) issued. !meme Taco will pull back a taco meme to the channel it was requested. This is semi-random (1 of 10 images)
  - Poll - allows you to ask a simple yes/no poll in channel for people to vote on using interactive buttons.
  - Readflats - can be anything from ascii art (!cat) to the list of commands (!help) - the current file list is in /flatfiles. you can add/alter these without taking down Jeeves
  - RSSFeed - at 4pm CST, Jeeves will pull in news articles from Kotaku and PCGames.come to the Discord channel of your choosing (See README file).
  - Status (WIP/PROOF of concept) - if Jeeves is running on a game server, you can check the status of the server. Must enter the PID and name of the server into the .js file.
  - Weather - uses the Open Weather API to give you a 5 day forecast, or today's weather, based on zip code.

WIP features:
  - voice commands - at this point, all he can do is enter a channel and obey a handful of commands that could be typed out (!invite, for example). Additionally, the package he uses for voice recognition isn't perfect, and further work on my end is needed to refine it.
  - jsonfile read/write - I've only started work on this. The end goal is to be able to allow users to save info, or collect game information that can be read/edited/deleted as needed.

Known issues:
  - Polls - currently, anyone can vote multiple times. I thought I had resolved this, but apparently not.

You'll need to install node on the server/system Jeeves will be running on.
I included the node_modules in 2 rar files, so you do not need to run any console commands to install them. 
If you choose to delete the rars and install discord.js yourself, you'll need:   @discordjs/builders: ^0.12.0    

    discord-speech-recognition: ^2.2.0
    discord.js: ^13.6.0,
    discord.js-poll: ^1.2.1,
    dotenv: ^16.0.3,
    ffmpeg: ^0.0.4,
    ffmpeg-static: ^4.4.1,
    fs: ^0.0.1-security,
    giphy-js-sdk-core: ^1.0.6,
    libsodium-wrappers: ^0.7.10,
    node-schedule: ^2.1.0,
    request: ^2.88.2,
    rss-parser: ^3.12.0
    
