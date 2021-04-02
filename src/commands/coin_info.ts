import { CommandBase } from './base_command';
import { BaseProvider } from '../providers/base_provider';
import { MessageEmbed } from 'discord.js'

export class CoinInfoCommand extends CommandBase {
  constructor(provider: BaseProvider) {
    super('', provider)

  }
  async handleInput(input: string) {
    const coins = this.provider.getCoinNames();
    const inputWords = input.split(' ').map(x => x.toLocaleLowerCase());

    const matchedCoin = coins.find(coin => inputWords.includes('/' + coin) || coin === input.toLowerCase());

    if (matchedCoin) {
      const coin = await this.provider.getCoin(matchedCoin);


      if (coin) {
        const color = coin.percentChange24h > 0 ? '#25f20a' : '#ed2b05'
        const coinUrl = 'https://coinmarketcap.com/currencies/' + coin.slug;
        const exampleEmbed = new MessageEmbed()
          .setColor(color)
          .setTitle(`${coin.symbol} Price Statistics`)
          .setURL(coinUrl)
          .setAuthor(`${coin.name} - ${coin.symbol}`, `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`, coinUrl)
          .setDescription(coin.tags.join(', '))
          .setThumbnail(`https://s2.coinmarketcap.com/static/img/coins/128x128/${coin.id}.png`)
          .addFields(
            { name: 'Market Rank', value: '#' + coin.rank, inline: true },
            {
              name: 'Price', value: this.currencyFormatter.format(coin.price), inline: true
            },
            { name: '\u200B', value: '\u200B' },
            { name: 'Market Cap', value: this.compactFormater.format(coin.marketCap), inline: true },
            { name: 'Trading Volume 24h', value: this.compactFormater.format(coin.volume24h), inline: true },
            { name: 'Trading Volume 7d', value: this.compactFormater.format(coin.volume7d), inline: true },

            { name: '\u200B', value: '\u200B' },
            { name: '% change 1h ', value: this.percentFormater.format(coin.percentChange1h / 100), inline: true },
            { name: '% change 24h ', value: this.percentFormater.format(coin.percentChange24h / 100), inline: true },
            { name: '% change 7d ', value: this.percentFormater.format(coin.percentChange7d / 100), inline: true },
            { name: '% change 30d ', value: this.percentFormater.format(coin.percentChange30d / 100), inline: true },
            { name: '% change 60d ', value: this.percentFormater.format(coin.percentChange60d / 100), inline: true },

            { name: '% change YTD', value: this.percentFormater.format(coin.ytdPriceChangePercentage / 100), inline: true },
          )
          //.addField('Inline field title', 'Some value here', true)
          .setImage(`https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/${coin.id}.png`)
          .setTimestamp()
          .setFooter('Data by coinmarketcap.com', `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`);

        return exampleEmbed
      }
    }
  }
}
