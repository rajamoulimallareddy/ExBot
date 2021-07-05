const util = require("../../utils/util");
const { getMemberFromMention } = require("../../utils/util");

module.exports = {
      config: {
        name: "ban",
        aliases: ["ban"],
        usage: "permissions [user mention/ID]",
      },
    run: async (client, message, args ) => {
   if (!message.member.permissions.has('ADMINISTRATOR')) return;

    const member = getMemberFromMention(message, args[0]) || message.guild.members.cache.get(args[0]);
    if (!member)
      return message.channel.send('Please mention a user or provide a valid user ID');
    if (member === message.member)
      return message.channel.send('You cannot ban yourself'); 
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send('You cannot ban someone with an equal or higher role');
    if (!member.bannable)
      return message.channel.send('Provided member is not bannable');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
    
    await member.ban({ reason: reason });

    const embed = util.embed()
      .setTitle('Ban Member')
      .setDescription(`${member} was successfully banned.`)
      .addField('Moderator', message.member, true)
      .addField('Member', member, true)
      .addField('Reason', reason)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
    }
};