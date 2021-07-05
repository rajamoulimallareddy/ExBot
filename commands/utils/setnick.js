const util = require("../../utils/util");
const { getMemberFromMention } = require("../../utils/util");

module.exports = {
      config: {
        name: "setnick",
        usage: "permissions [user mention/ID]",
      },
          run: async (client, message, args ) => {
               if (!message.member.permissions.has('ADMINISTRATOR')) return;

const member = getMemberFromMention(message, args[0]) || message.guild.members.cache.get(args[0]);
    if (!member)
      return message.channel.send('Please mention a user or provide a valid user ID');
    if (member.roles.highest.position >= message.member.roles.highest.position && member != message.member)
      return message.channel.send(stripIndent`
        You cannot change the nickname of someone with an equal or higher role
      `);

    if (!args[1]) return message.channel.send('Please provide a nickname');

    // Multi-word nickname
    let nickname = args[1];
    if (nickname.startsWith('"')) {
      nickname = message.content.slice(message.content.indexOf(args[1]) + 1);
      if (!nickname.includes('"')) 
        return message.channel.send('Please ensure the nickname is surrounded in quotes');
      nickname = nickname.slice(0, nickname.indexOf('"'));
      if (!nickname.replace(/\s/g, '').length) return message.channel.send('Please provide a nickname');
    }

    if (nickname.length > 32) {
      return message.channel.send('Please ensure the nickname is no larger than 32 characters');
      
    } else {

      let reason;
      if (args[1].startsWith('"')) 
        reason = message.content.slice(message.content.indexOf(nickname) + nickname.length + 1);
      else reason = message.content.slice(message.content.indexOf(nickname) + nickname.length);
      if (!reason) reason = '`None`';
      if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

      try {

        // Change nickname
        const oldNickname = member.nickname || '`None`';
        const nicknameStatus = `${oldNickname} ➔ ${nickname}`;
        await member.setNickname(nickname);
        const embed = util.embed()
          .setTitle('Set Nickname')
          .setDescription(`${member}'s nickname was successfully updated.`)
          .addField('Moderator', message.member, true)
          .addField('Member', member, true)
          .addField('Nickname', nicknameStatus, true)
          .addField('Reason', reason)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);


      } catch (err) {
        message.channel.send('Please check the role hierarchy');
      }
    }  
          }
}