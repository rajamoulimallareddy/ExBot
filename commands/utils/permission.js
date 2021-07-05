const util = require("../../utils/util");
const permissions = require("../../utils/permissions.json");
const { getMemberFromMention } = require("../../utils/util");

module.exports = {
      config: {
        name: "permission",
        aliases: ["permis"],
        usage: "permissions [user mention/ID]",
      },
    run: async (client, message, args ) => {
        const member = getMemberFromMention(message, args[0]) || 
              message.guild.members.cache.get(args[0]) || 
              message.member;
        
        // Get member permissions
        const memberPermissions = member.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (memberPermissions.includes(permission)) finalPermissions.push(`+ ${permissions[permission]}`);
            else finalPermissions.push(`- ${permissions[permission]}`);
        }
        
        const embed = util.embed()
            .setTitle(`${member.displayName}'s Permissions`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`\`\`\`diff\n${finalPermissions.join("\n")}\`\`\``)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setColor('#2F3136')
            .setTimestamp();
        message.channel.send(embed);

    }
};