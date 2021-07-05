
const moment = require("moment");
const util = require("../../utils/util");

const serverflags = {
    DISCORD_EMPLOYEE: " <:757681878064169051:757978989691404389> `Discord Employee`",
    DISCORD_PARTNER: "<a:WhiteServerPartner:799686403143237693> `Discord Partner`",
    BUGHUNTER_LEVEL_1: "<:bughunter:814911038793187418> `Bug Hunter (Level 1)`",
    BUGHUNTER_LEVEL_2: "<:bug_hunter:814910605755416616>  `Bug Hunter (Level 2)`",
    HYPESQUAD_EVENTS: "<a:CH_HypesquadShiny:814909157697388544>  `HypeSquad Events`",
    HOUSE_BRAVERY: "<:bravery:843903223420682260>  `House of Bravery`",
    HOUSE_BRILLIANCE: "<:vbhb:843904020992098355>  `House of Brilliance`",
    HOUSE_BALANCE: "<:vbbb:843904304040640533> `House of Balance`",
    EARLY_SUPPORTER: "<:BadgeEarlySupporter:814908146111217707> `Early Supporter`",
    TEAM_USER: "`Team User`",
    SYSTEM: "`System`",
    VERIFIED_BOT: "<:vbvb:843904664705171498>  `Verified Bot`",
    VERIFIED_DEVELOPER: "<:botdev:843899839481643048> `Verified Bot Developer`",
};
const st = {
    online: "<:online:843900331422646292> Online",
    idle: "<:vbidle:843900887973494822> IDLE",
    offline: "<:vboff:843901243964391455> Offline",
    dnd: "<:vbdnd:843901602141831288> Do Not Disturb",
};
  
module.exports = {
  config:{
        name: "usernifo",
        aliases: ["userinfo","uf","whois"],
        usage: "",
        category: "utilities",
        description: "",
        accessableby: "",
  },
    run: async (client, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
        const nickname = member.nickname || "*None*";
        const discriminator = member.user.discriminator || "*None*";
    
        const createdAt = moment.utc(member.user.createdAt).calendar();
        const lp = moment.utc(member.user.createdAt).fromNow();
        const joinedAt = moment.utc(member.joinedAt).calendar();
        const lap = moment.utc(member.joinedAt).fromNow();  
    
        let userFlags = (await member.user.fetchFlags())
            .toArray()
            .map((flag) => serverflags[flag]);
        if (!userFlags || !userFlags.length) userFlags = "*None*";
    
        const avatar =
          member.user.displayAvatarURL({
              format: "png",
              dynamic: true,
              size: 4096,
          }) || "*None*";
    
        const bot = member.user.bot ? "Yes" : "No";
    
        const activities =
          member.user.presence.activities.length === 0
              ? {
                  status: "*None*",
                  other: [],
              }
              : member.user.presence.activities.reduce(
                  (activities, activity) => {
                      switch (activity.type) {
                      case "CUSTOM_STATUS":
                          activities.status = `${
                              activity.emoji ? `${activity.emoji} | ` : ""
                          }${activity.state}`;
                          break;
                      case "PLAYING":
                          activities.other.push(`${activity.type} ${activity.name}`);
                          break;
                      case "LISTENING":
                          if (activity.name === "Spotify" && activity.assets) {
                              activities.other.push(
                                  `${activity.details} by ${activity.state}`
                              );
                          }
                          break;
                      default:
                          activities.other.push(activity.type);
                      }
    
                      return activities;
                  },
                  {
                      status: "*None*",
                      other: [],
                  }
              );
    
        const roles = member.roles.cache.array().length
            ? member.roles.cache
                .array()
                .filter((role) => role.name !== "@everyone")
                .join(", ")
            : "*None*";
        const highestRole = member.roles.highest || "*None*";
        const hoistRole = member.roles.hoist || "*None*";
        let status = st[member.presence.status];

                const devices = member.presence.clientStatus || {};

        const description = () => {
            if (devices > 1) {
                const entries = Object.entries(devices).map(
                    (value) => value[0]
                );
                return `Devices: ${entries}`;
            } else {
                const entries = Object.entries(devices).map(
                    (value, index) => `${index + 1}) ${value[0]}`)
                .join("\n");
                return `Devices:\n${entries}`;
            }
        };
 
        const embed = util.embed()
            .setTitle(member.user.tag)
            .setURL(avatar)
            .setThumbnail(avatar)
            .setColor('#2F3136')
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp()
            .addFields(
                {
                    name: "Nickname",
                    value: nickname,
                    inline: true,
                },
                {
                    name: "#️Discriminator",
                    value: discriminator,
                    inline: true,
                },
                {
                    name: "Build",
                    value: `${createdAt} | ${lp}`,
                    inline: false,
                },
                {
                    name: "Joined",
                    value: `${joinedAt} | ${lap}`,
                    inline: true,
                },
                {
                    name: "Badges",
                    value: userFlags,
                    inline: false,
                },
                {
                    name: "Bot",
                    value: bot,
                    inline: true,
                },
                {
                    name: "Custom Status",
                    value: activities.status,
                    inline: true,
                },
                {
                    name: " Status",
                    value: `${status}`,
                    inline: true,
                },
                {
                    name: "🥇Highest Role",
                    value: highestRole || "None",
                    inline: true,
                },
                {
                    name: "Hoist Role",
                    value: hoistRole || "None",
                    inline: true,
                },
                {
                    name: " Activities",
                    value:
                activities.other && activities.other.length
                    ? activities.other.join("\n")
                    : "*None*",
                    inline: true,
                },
                {
                    name: ` Roles (${member.roles.cache.size - 1})`,
                    value: roles || "None",
                    inline: true,
                },
                {
                  name: "devices",
                  value: description(),
                  inline: true,
                }
            );
    
        message.channel.send(embed);
      
    },
    
};
    