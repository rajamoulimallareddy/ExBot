const Canvas = require('canvas')
const Discord = require('discord.js')


module.exports = async (client, member) => { 
 
var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
welcomeCanvas.context.font = '72px sans-serif';
welcomeCanvas.context.fillStyle = '#ffffff';
const image = 'https://cdn.discordapp.com/attachments/857931341861224448/857955895929733140/rep2.jpg';

Canvas.loadImage(image).then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)
    welcomeCanvas.context.fillText("welcome", 360, 360);
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
    welcomeCanvas.context.stroke()
    welcomeCanvas.context.fill()
})

    let canvas = welcomeCanvas;
    canvas.context.font = '42px sans-serif',
    canvas.context.textAlign = 'center';
    canvas.context.fillText(member.user.tag.toUpperCase(), 512, 410)
    canvas.context.font = '32px sans-serif'
    canvas.context.fillText(`You are the ${member.guild.memberCount}th`, 512, 455)
    canvas.context.beginPath()
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}))
    .then(img => {
        canvas.context.drawImage(img, 393, 47, 238, 238);
    })
    let atta = new Discord.MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`)
    try {
        client.channels.cache.get('843522679201726484').send(`:wave: Hello ${member}, welcome to ${member.guild.name}!`, atta)
    } catch (error) {
        console.log(error)
    }
}


// const Discord = require("discord.js");
// const Canvas = require("canvas")
// const canvacord = require('canvacord');
// module.exports = async (client, member) => { 

//   //-------------------------
//   if (member.guild.id !== "842773814290022490") return;
//   const welcomeCard = new canvacord.Welcomer()
//   .setUsername(member.user.username)
//   .setDiscriminator(member.user.discriminator)
//   .setAvatar(member.user.displayAvatarURL({format:"png"}))
//   .setColor("title", "#b4cdd1")
//   .setColor("username-box","#b4cdd1")
//   .setColor("discriminator-box","#b1bbe0")
//   .setColor("message-box","#b1bbe0")
//   .setColor("border","#b1bbe0")
//   .setColor("avatar","#b1bbe0")
//   .setBackground("https://wallpaperaccess.com/full/121177.jpg")
//   .setMemberCount(member.guild.membersCount)
//   let attachment = new Discord.MessageAttachment(await welcomeCard.build(),"welcome.png")
//   member.guild.channels.cache.get("843522679201726484").send(member.user.toString(), attachment)
// }
