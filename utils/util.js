const { MessageEmbed, Permissions } = require("discord.js");

module.exports = class Util {
    static embed() {
        return new MessageEmbed()
            .setColor("f9cf06");
    }

    static getMemberFromMention(message, mention) {
        if (!mention) return;
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;
        const id = matches[1];
        return message.guild.members.cache.get(id);
    }
    static getRoleFromMention(message, mention) {
        if (!mention) return;
        const matches = mention.match(/^<@&(\d+)>$/);
        if (!matches) return;
        const id = matches[1];
        return message.guild.roles.cache.get(id);
    }
    static sendErrorMessage(message, errorType, reason, errorMessage = null) {
        errorType = this.errorTypes[errorType];
        const prefix = require("./config.json");
        const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`${fail} Error: \`${this.name}\``)
            .setDescription(`\`\`\`diff\n- ${errorType}\n+ ${reason}\`\`\``)
            .addField("Usage", `\`${prefix}${this.usage}\``)
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        if (this.examples) embed.addField("Examples", this.examples.map(e => `\`${prefix}${e}\``).join("\n"));
        if (errorMessage) embed.addField("Error Message", `\`\`\`${errorMessage}\`\`\``);
        message.channel.send(embed);
    }
    /**
   * Gets text channel from mention
   * @param {Message} message 
   * @param {string} mention 
   */
    static getChannelFromMention(message, mention) {
        if (!mention) return;
        const matches = mention.match(/^<#(\d+)>$/);
        if (!matches) return;
        const id = matches[1];
        return message.guild.channels.cache.get(id);
    }
};
