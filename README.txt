If you're reading this, thanks for checking out my bot. I created this over Covid out of boredom, and decided to share it.

I apologize for the minor set up you'll have to do. Some of the things this does have to be catered to the specific server. Eventually, I'll see to streamlining this more.

In order to get this working you'll need to do:

- create a discord bot token - plenty of how-tos online for this, he'll need all permissions.
	- Yes, I know that's asking for a lot, but he does a lot, and will do more as time progresses.
	- all his custom commands are under functions/lib, which can be seen listed in the Commands.js file
	- in short, there is no ill-will here, I simply got tired of fighting discord over permissions.

- update the Config.env file with your info
	- token = discord token
	- ow_key = open weather API (it's free, but you need to register - https://openweathermap.org/api)
	- gtoken = giphy API (Also free, also need to register - https://developers.giphy.com)


- update some of the functions/lib files to your specific server.
	- Invite.js, deleteInvites.js
		- update the spots where it shows 000 to your discord server id. 
		- right click on the discord server and copy id.
	- MakeMember.js
		- update 000 to the discord server id
		- update 111 to the admin-only channel
		- The idea is to allow anyone to request membership for someone, but an admin must approve it
	- RSSFeed.js
		- update 11 to the channel you would like the news articles to appear
		- this is set to run daily at 4pm CST, I would not suggest having this in your main channel

	- Status.js
		- the servers array needs to be updated to your server list, based on PIDs in task 		  manager/details
		- this process is rudamentary and was more proof-of-concept.
		- it'll work if you don't mind updating the not-so static PIDs on server reboots.
	- index.js
		- update 000 with discord server ID
		- update 111 with member cache ID
		
minor notes:

	Flatfile folder
		- these are called by their names (!cat to display an ascii cat on screen)
		- you can add them on-the-fly, so no need to reboot jeeves
		- make sure to follow the format to get them to display correctly
			- ``` at the beginning/end of each ascii image

	Ping comand
		- Ping will give you the lag between you and Jeeves. Not terribly useful if you are running
		  Jeeves from your own machine!

	Images folder
		- WIP, but for now the image in there is what shows when !meme does not find a result from the
		  GIFY API.

	Voice commands
		- Jeeves has some very basic voice commands. It's something I've been slowly working on (FT job)
			- Invite, Delete, Disconnect (he can make a guild invite, delete invites from memory, and 			  leave a channel)
		- another WIP, at this point it's not even worth using, but a fun concept.

