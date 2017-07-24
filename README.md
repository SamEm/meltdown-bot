# Meltdown's Discord bot

Based on [Hype Bot](https://github.com/SamEm/HypeBot)


## Usage:
First get your bot token and insert it into `token.js` from [here](https://discordapp.com/developers/applications/me).
Then:
- Run `npm install` to fetch all dependencies
- Run with `forever start appStart.json`

All errors are logged into `/logs/botlog.log`
### Commands:

Moderator commands are:
- `!ping`
- `!restart`
- `!allRoles`

Location commands depend on `ids.js`
