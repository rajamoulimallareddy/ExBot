const { stripIndent } = require('common-tags');
const util = require("../../utils/util");

module.exports = {
    config: {
      name: "ping",
    },
    run: async(client,message,args) => {
        const m = await message.channel.send('Pinging...');
        const gtp = Math.round(message.client.ws.ping);

        let clientStats = stripIndent`
           Gateway Ping : ${gtp}ms
           REST Ping    : ${m.createdTimestamp - message.createdTimestamp}ms
           `;
        const embed = util
            .embed()
            .setAuthor(
                ' |   Pong',
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(`\`\`\`nim\n${clientStats}\`\`\``);
        m.edit('', embed);
    }
}