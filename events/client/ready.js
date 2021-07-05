const { Collection, MessageEmbed } = require("discord.js");
const figlet = require('figlet');
const chalk = require('chalk');
const { prefix } = require("../../config.json");
const util = require('../../utils/util.js'); 
module.exports = async (client) => {
    figlet(client.user.tag, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red.bold(data));
    });

    let activity = [`${client.guilds.cache.size} Guilds!`, `${client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)} | Members!`, `${client.channels.cache.size} | Channels!`], i = 0;
        setInterval(() => client.user.setActivity(`${prefix}help <command> | ${activity[i++ % activity.length]}`, { type: "LISTENING", url: "https://www.twitch.tv/lol" }), 15000)





        const status = {
            ONLINE: "<:online:843900331422646292>",
            OFFLINE: "<:vboff:843901243964391455>",
            IDLE: "<:vbidle:843900887973494822>",
            DND: "<:vbdnd:843901602141831288>"
        }
    
        // const saurabh = status[client.users.cache.get('788379402844373044').presence.status.toUpperCase()]
        // const boyfie = status[client.users.cache.get('548192290003353631').presence.status.toUpperCase()]
        const aqua = status[client.users.cache.get('777165206203007017').presence.status.toUpperCase()]
        const aqua2 = status[client.users.cache.get('802195829330280498').presence.status.toUpperCase()]
        const aqua3 = status[client.users.cache.get('798435493469618207').presence.status.toUpperCase()]
        const vibely = status[client.users.cache.get('833549773884751913').presence.status.toUpperCase()]
        const raj = status[client.users.cache.get('688028837711446041').presence.status.toUpperCase()]

        const stats = "843522654307876894";
        const channel = client.channels.cache.get(stats)
    
        const embed = util.embed()
            // .setAuthor("LIVE STATS", "https://media.discordapp.net/attachments/843021651292979230/857662130572886036/20210608_145220.png")
            // .setDescription(`**OFIRA**\n Ofira: ${ofira}\n Ofira 2: ${ofira2}\n Ofira 3: ${ofira3}\n Ofira Chan: ${ofira4}\n\n**DEVELOPER**\n BOYFIE: ${boyfie}\n SAURABH: ${saurabh}`)
            // .addField('Aqua', `\`\`\`${aqua}\`\`\``, true)
            // .addField('Aqua 2', `\`\`\`${aqua2}\`\`\``, true)
            // .addField('Aqua 3 ', `\`\`\`${aqua3}\`\`\``, true)
            // .addField('Vibely', `\`\`\`${vibely}\`\`\``, true)
            // .addField('Raj', `\`\`\`${raj}\`\`\``, true)
            // .setColor("RED")
            // .setFooter("POWERED BY OFIRA", "https://media.discordapp.net/attachments/843021651292979230/857662130572886036/20210608_145220.png")
            .setDescription(`Aqua - ${aqua}\n\nAqua2 - ${aqua2}\n\nAqua3 - ${aqua3}\n\nVibely - ${vibely}\n\nraj - ${raj}\n\n`)

    
        channel.bulkDelete(2);
        channel.send(embed).then((msg) => {
            setInterval(() => {
                const aqua = status[client.users.cache.get('777165206203007017').presence.status.toUpperCase()]
                const aqua2 = status[client.users.cache.get('802195829330280498').presence.status.toUpperCase()]
                const aqua3 = status[client.users.cache.get('798435493469618207').presence.status.toUpperCase()]
                const vibely = status[client.users.cache.get('833549773884751913').presence.status.toUpperCase()]
                const raj = status[client.users.cache.get('688028837711446041').presence.status.toUpperCase()]

        
                // const rembed = new Discord.MessageEmbed()
                const rembed = util.embed()
                .setDescription(`Aqua - ${aqua}\n\nAqua2 - ${aqua2}\n\nAqua3 - ${aqua3}\n\nVibely - ${vibely}\n\nraj - ${raj}\n\n`)
                // .setAuthor("LIVE STATS", "https://media.discordapp.net/attachments/843021651292979230/857662130572886036/20210608_145220.png")
                // .setDescription(`**OFIRA**\n Ofira: ${ofira}\n Ofira 2: ${ofira2}\n Ofira 3: ${ofira3}\n Ofira Chan: ${ofira4}\n\n**DEVELOPER**\n BOYFIE: ${boyfie}\n SAURABH: ${saurabh}`)
                // .addField('Aqua', `\`\`\`${aqua}\`\`\``, true)
                // .addField('Aqua 2', `\`\`\`${aqua2}\`\`\``, true)
                // .addField('Aqua 3 ', `\`\`\`${aqua3}\`\`\``, true)
                // .addField('Vibely', `\`\`\`${vibely}\`\`\``, true)
                // .addField('Raj', `\`\`\`${raj}\`\`\``, true)

                .setColor("RED")
                msg.edit(rembed);
            }, 5000);
        })
    
        console.log('✔️ lol live stats Ready!!')
};