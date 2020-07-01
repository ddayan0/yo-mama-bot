// Dennis Dayan
// significant portion of ytdl code taken from https://gabrieltanner.org/blog/dicord-music-bot
// REPLACE THE TOKEN IN CONFIG.JSON
const Discord = require('discord.js');
const{prefix, token,} = require('./config.json');
const ytdl = require('ytdl-core');
// above are dependencies
const client = new Discord.client();
client.login(token);
// creates client and logs in
const queue = new Map();
// creates queue

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}$play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}$skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}$stop`)) {
    stop(message, serverQueue);
    return;
  } else {
    message.channel.send("enter a valid command tyson");
  }
});



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
const songInfo = await ytdl.getInfo(args[1]);
const song = {
  title: songInfo.title,
  url: songInfo.video_url,
};
// have no clue why this code is all needed
if(!serverQueue){ // fix this afterwards
}else {
  serverQueue.songs.push(song);
  console.log(serverQueue.songs);
  return message.channel.send('${song.title} has been added retard');
}
// why can this not just be one if statement?
// ?????? >js devs
const queueContruct = {
  textChannel: message.channel,
  voiceChannel: voiceChannel,
  connection: null,
  songs: [],
  volume: 5,
  playing: true,
 };
 // creates queue contract
 // EDIT THIS!
 queue.set(message.guild.id, queueContruct);
queueContruct.song.push(song);
// BELOW IS ALL FROM WEBSITE CITED ABOVE
try {
  // Here we try to join the voicechat and save our connection into our object.
  var connection = await voiceChannel.join();
  queueContruct.connection = connection;
  // Calling the play function to start a song
  play(message.guild, queueContruct.songs[0]);
 } catch (err) {
  // Printing the error message if the bot fails to join the voicechat
  console.log(err);
  queue.delete(message.guild.id);
  return message.channel.send(err);
 }
// END CITATION
function play(guild, song){
  const serverQueue = queue.get(guild.id);
  if(!song){
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
}
// actual play function
const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
serverQueue.textChannel.send(`your song: **${song.title}** , dumbass`);
// dispatcher (self-explanatory)
function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "https://www.youtube.com/watch?v=aM3ElTvF52I&t=337s"
    );
  if (!serverQueue)
    return message.channel.send("https://www.youtube.com/watch?v=aM3ElTvF52I&t=337s");
  serverQueue.connection.dispatcher.end();
}
function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "get in voice to stop the music you absolute buffoon"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

Complete 

