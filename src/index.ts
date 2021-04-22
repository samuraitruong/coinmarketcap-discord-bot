import dotenv from 'dotenv';
dotenv.config();

import Discord from 'discord.js'
import commands from './commands';
import express from 'express';
import { CoinGeckoClient } from 'coingecko-api-v3';
import { trendingCommand } from './commands/index';


(async () => {
  const client = new Discord.Client();
  const defaultChannelId = '827125469521379391';
  let defaultChannel;

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
    defaultChannel = await client.channels.cache.find(x => x.id === defaultChannelId);

    if (process.env.NODE_ENV !== 'development') {
      defaultChannel.send('Hello, I am your crypto bot. glad to help you here.')
    }
  })
  client.login(process.env.BOT_TOKEN);
  const app = express()

  app.get('/', (req, res) => {
    res.send('Hey, I am alive')
  })
  app.get('/reminder', (req, res) => {
    defaultChannel.send('Hello Boss. kindy reminder you to activate your StomGain :)')
  })
  let lastTrending = '';
  setInterval(async () => {
    console.log('Refresh trending...');
    const res = await trendingCommand.handleInput(trendingCommand.command, true);
    if (res !== lastTrending) {
      console.log('trending has changed', res);
      lastTrending = res
      defaultChannel.send('Coin trending updated: ```' + lastTrending + ' ```')
    }
  }, 30000)

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

})()
