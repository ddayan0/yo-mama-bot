// Dennis Dayan
// significant portion of ytdl code taken from https://gabrieltanner.org/blog/dicord-music-bot



const Discord = require('discord.js');
const{prefix, token,} = require('./config.json');
const ytdl = require('ytdl-core');
// above are dependencies
const client = new Discord.client();
client.login(token);
// creates client and logs in
const queue = new Map();
// creates queue
async function execute(message, serverQueue) {
    const args = message.content.split(" ");
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "احصل على صوت غبي"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "أذونات عاهرة"
      );
    }
}
// checks and displays message if the bot does not have perms
// messages are in arabic and in accordance with requirements

