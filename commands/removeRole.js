"use strict";
const config = require("../config");
const ids = require('../ids');
let utils = require('../utils');

let removeRole = {
  pattern: /!remove/i,
  execute: function(bot, channelID, userTag, userID, command, msg) {
    let splitMsg = msg.content.split(' ');
    splitMsg.shift();

    let joinMsg = splitMsg.join('');

    if(!joinMsg) {
      bot.createMessage(channelID, "<@" + userID + ">, you need to add a location to remove").then(utils.delay(config.delayInMS)).then((msgInfo) => {
        bot.deleteMessage(channelID, msgInfo.id);
        bot.deleteMessage(channelID, msg.id);
      }).catch((err) => {
        console.log("--> removeRoles | wrongRole\n" + err);
      });
      return;
    }

    let locationID = ids[joinMsg.toLowerCase()];
    if(!locationID) {
      return;
    }

    let roles = msg.member.roles;
    let index = roles.indexOf(locationID);
    let indexVCRole = roles.indexOf(config.vcRole);

    if(index !== -1){
      roles.splice(index, 1);
    }

    if(indexVCRole === -1 && index === -1) {
      return;
    }

    bot.editGuildMember(msg.channel.guild.id, userID, {
      roles: roles
    }).then(() => {
      bot.createMessage(channelID, "<@" + userID + ">, you have been removed from the `" + joinMsg + "` location.").then(utils.delay(config.delayInMS)).then((msgInfo) => {
        bot.deleteMessage(channelID, msgInfo.id);
        bot.deleteMessage(channelID, msg.id);
      }).catch((err) => {
        console.log("--> removeRoles | remove Text\n" + err);
      });
    }).catch((error) => { console.log("--> removeRoles | remove Role\n" + error);});
  },
  roles: [
    config.everybodyRole
    ],
  channels: [
    config.botSpam
  ]
}
module.exports = removeRole;
