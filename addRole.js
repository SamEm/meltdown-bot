"use strict";
const config = require('./config');
let utils = require('./utils');

let addRoles = {
  location: function(bot, userID, channelID, location, msg, locationName, userTag){
    let roles = msg.member.roles;

    let index = roles.indexOf(location);
    if(index === -1) {
      roles.push(location);
    }

    let vcIndex = roles.indexOf(config.vcRole);
    if(vcIndex === -1) {
      roles.push(config.vcRole);
    }

    if(vcIndex > -1 && index > -1) {
      return;
    }

    bot.editGuildMember(msg.channel.guild.id, userID, {
      roles: roles
    }).then(() => {
      bot.createMessage(channelID, "<@" + userID + ">, you have been given the location of `" + locationName + "`.").then(utils.delay(config.delayInMS)).then((msgInfo) => {
        bot.deleteMessage(channelID, msgInfo.id);
        bot.deleteMessage(channelID, msg.id);
      }).catch((err) => {
        console.log("--> AddRoles | addRole Text\n" + err);
      });
    }).catch((error) => { console.log("--> Addroles | add Role\n" + error);});
  }
}

module.exports = addRoles;
