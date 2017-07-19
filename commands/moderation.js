"use strict";
const config = require("../config");
const utils = require('../utils');

let moderation = {
  pattern: /!restart|!ping|!addrole|!allroles/i,
  execute: function(bot, channelID, userTag, userID, command, msg) {
    switch (command.toLowerCase()) {
      case "!allroles":
        let roles = msg.member.guild.roles;
        let allRoles = '';
        let rolesList = roles.map(function(role) {
          let thisRole = `\n${role.name}: '${role.id}'`;
          if(thisRole.length + allRoles.length > 1990) {
            bot.createMessage(channelID, "```js" + allRoles + "```").catch((err) => {
              console.log("roleList\n" + err);
            });
            allRoles = '';
          }
          allRoles += thisRole;
        });

        bot.createMessage(channelID, "```js" + allRoles + "```").catch((err) => {console.log(err);});
        break;
      case "!restart":
        console.log("Restarting");
          process.exit();
        break;
      case "!ping":
        console.log("Pong!");
        bot.createMessage(channelID, "Pong!");
        break;
    }
  },
  roles: [
    config.meltOffice,
    config.meltStaff,
    config.meltAdmin
    ],
  channels: [
    config.allChannels
  ]
}
module.exports = moderation;
