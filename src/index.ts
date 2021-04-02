import Discord from 'discord.js'
import dotenv from 'dotenv';
import { Coinspot } from './providers/coinspot';
import commands from './commands';
dotenv.config();

(async () => {
  const client = new Discord.Client();
  const defaultChannelId = '827125469521379391';

  client.on("message", async (message) => {
    for await (const cmd of commands) {
      if (message.author.bot) return;

      const outMessage = await cmd.handleInput(message.content);
      console.log(outMessage)
      if (outMessage) {
        message.reply(outMessage)
      }
    }
  });
  client.on('ready', async () => {
    const channel: any = await client.channels.cache.find(x => x.id === defaultChannelId);
    channel.send('Hello, I am your crypto bot. glad to help you here.')
  })
  client.login(process.env.BOT_TOKEN);
})()
