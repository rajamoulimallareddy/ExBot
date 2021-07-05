const util = require("../../utils/util");

module.exports = {
      config: {
        name: "unbanall",
        aliases: ["ubl"],
      },
    run: async (client, message, args ) => {
        const noadmin = util.embed()
            .setDescription(`*You are missing \`ADMINISTRATOR\` permissions to perform this execution.*`);

                if (message.member.hasPermission("ADMINISTRATOR")) {
                    message.guild.fetchBans().then(bans => {
                        if (bans.size == 0) {
                            message.reply("There are no banned users.")
                        } else {
                            bans.forEach(ban => {
                                message.guild.members.unban(ban.user.id);
                            })
                            message.channel.send(`Unbanned All Banned Members.`)
                        }
                    }
                    )
                } else {
                    return await message.channel.send(noadmin);
                }
    }
}