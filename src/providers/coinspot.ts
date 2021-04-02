import axios from 'axios';
import cheerio from 'cheerio';

export class Coinspot {
  constructor() {

  }
  async getTopCoins() {
    const url = 'https://www.coinspot.com.au/tradecoins';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('.panel-body .col-xs-2').toArray().map((el) => {

      return {
        coin: $('.btn-default', el).text().replace('BUY', '').trim(),
        increase: $('.moveup', el).text().split(' ')[0],
      }
    })
  }
}
