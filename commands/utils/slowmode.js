const util = require("../../utils/util");
const { getMemberFromMention } = require("../../utils/util");

module.exports = {
      config: {
        name: "slowmode",
        aliases: ['slow'],
        usage: "permissions [user mention/ID]",
      },
      
    run: async (client, message, args ) => {
   if (!message.member.permissions.has('ADMINISTRATOR')) return;

          let index = 1;
    let channel = getChannelFromMention(message, args[0]) || message.guild.channels.cache.get(args[0]);
    if (!channel) {
      channel = message.channel;
      index--;
    }

    // Check type and viewable
    if (channel.type != 'text' || !channel.viewable) return message.channel.send(messagent`
      Please mention an accessible text channel or provide a valid text channel ID
    `);
      
    const rate = args[index];
    if (!rate || rate < 0 || rate > 59) return message.channel.send('Please provide a rate limit between 0 and 59 seconds');

    // Check channel permissions
    if (!channel.permissionsFor(message.guild.me).has(['MANAGE_CHANNELS']))
      return message.channel.send('I do not have permission to manage the provided channel');

    let reason = args.slice(index + 1).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
    
    await channel.setRateLimitPerUser(rate, reason); // set channel rate
    const status = (channel.rateLimitPerUser) ? 'enabled' : 'disabled';
    const embed = util.embed()
      .setTitle('Slowmode')
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    // Slowmode disabled
    if (rate === '0') {
      message.channel.send(embed
        .setDescription(`\`${status}\` ➔ \`disabled\``)
        .addField('Moderator', message.member, true)
        .addField('Channel', channel, true)
        .addField('Reason', reason)
      );
    
      // Slowmode enabled
    } else {

      message.channel.send(embed
        .setDescription(`\`${status}\` ➔ \`enabled\``)
        .addField('Moderator', message.member, true)
        .addField('Channel', channel, true)
        .addField('Rate', `\`${rate}\``, true)
        .addField('Reason', reason)
      );
    }
    }
}