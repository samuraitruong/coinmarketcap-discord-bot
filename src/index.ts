import dotenv from 'dotenv';
dotenv.config();

import Discord from 'discord.js'
import commands from './commands';
import express from 'express';
import { trendingCommand, defaultProvider } from './commands/index';
import { Scheduler } from './scheduler';

(async () => {
  const scheduler = new Scheduler(defaultProvider);
  const client = new Discord.Client();
  const defaultChannelId = process.env.DEFAULT_CHANNEL_ID || '827125469521379391';
  const trendingChannelId = process.env.DEFAULT_TRENDING_CHANNEL_ID || '835369480799387678';

  let defaultChannel;
  let trendingChannel;

  client.on("message", async (message) => {
    // console.log(message)
    if (message.author.bot) return;
    for await (const cmd of commands) {

      const outMessage = await cmd.handleInput(message.content);
      if (outMessage) {
        if (Array.isArray(outMessage)) {
          outMessage.map(x => message.reply(x))
        }
        else
          message.reply(outMessage);

        if (cmd.stopChain) {
          break;
        }
      }
    }
  });
  client.on('ready', async () => {
    defaultChannel = await client.channels.cache.find(x => x.id === defaultChannelId);
    trendingChannel = await client.channels.cache.find(x => x.id === trendingChannelId);

    if (process.env.NODE_ENV !== 'development') {
      defaultChannel.send('Hello, I am your crypto bot. glad to help you here.')
    }
  })
  client.login(process.env.BOT_TOKEN);
  const app = express()

  app.get('/', (req, res) => {
    res.send('Hey, I am alive')
  })


  let lastTrending = '';

  scheduler.addInterval(async () => {
    console.log('Refresh trending...');
    const res = await trendingCommand.handleInput(trendingCommand.command, true);
    if (res !== lastTrending) {
      console.log('trending has changed', res);
      lastTrending = res
      trendingChannel.send('Coin trending updated: \n```' + lastTrending + ' ```')
    }
  }, 30000)


  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

})()
