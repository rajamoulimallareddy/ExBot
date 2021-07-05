const util = require("../../utils/util");
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
      config: {
        name: "unban",
        aliases: ["ub"],
        usage: "permissions [user mention/ID]",
      },
    run: async (client, message, args ) => {
         if (!message.member.permissions.has('ADMINISTRATOR')) return;

        const id = args[0];
    if (!rgx.test(id)) return message.channel.send('Please provide a valid user ID');
    const bannedUsers = await message.guild.fetchBans();
    const user = bannedUsers.get(id).user;
    if (!user) return message.channel.send('Unable to find user, please check the provided ID');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    await message.guild.members.unban(user, reason);
    const embed = util.embed()
      .setTitle('Unban Member')
      .setDescription(`${user.tag} was successfully unbanned.`)
      .addField('Moderator', message.member, true)
      .addField('Member', user.tag, true)
      .addField('Reason', reason)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    message.channel.send(embed);
    }
}