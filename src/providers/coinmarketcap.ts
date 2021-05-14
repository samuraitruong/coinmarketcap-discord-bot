import axios from 'axios';
import cheerio from 'cheerio';
import WebSocket from 'ws';
import { BaseProvider, CoinInfo } from './base_provider';

export class CoinMarketCap implements BaseProvider {
  private lastUpdate = 0;
  private data: any;
  public rawData: any[]
  private socket: WebSocket;
  constructor() {
    this.socket = new WebSocket('wss://stream.coinmarketcap.com/price/latest');
    this.keepSync();
  }
  async keepSync(internal = 60000) {
    console.log('Fetching initial data')
    this.data = this.toDictionary(await this.getCoinList());
    console.log('Fetching initial data finished, data will refresh every %d second', internal / 1000)
    setInterval(async () => {
      console.log('Refresh data')
      this.data = this.toDictionary(await this.getCoinList());
    }, internal)
  }
  async fetchPage(pageNumber: number) {
    const { data } = await axios.get(`https://coinmarketcap.com/?page=` + pageNumber);
    const $ = cheerio.load(data);

    return $('.cmc-table tbody tr').toArray().map(tr => {
      const td = $('td', tr).toArray()
      const p = $('.cmc-link p', tr).toArray();
      return {
        rank: +$(td[1]).text().trim(),
        coin: $(p[1]).text().trim(),
        coinName: $(p[0]).text().trim(),
        logo: $('.coin-logo', tr).attr('src'),
        price: $(td[3]).text().trim(),
        'p24h': $(td[4]).text().trim(),
        'p7d': $(td[5]).text().trim(),
        'marketCap': $(td[6]).text().trim(),
        'v24h': $(td[7]).text().trim(),
        circulatingSupply: $(td[8]).text().trim(),
        '7dayChart': $('img', td[9]).attr('src')
      }
    }).filter(x => x.coin)

  }
  toDictionary(data) {
    const dict = {};
    data.sort((a, b) => b.cmcRank - a.cmcRank).forEach(item => {
      dict[item.symbol.toLowerCase()] = item;
      dict[item.name.toLowerCase()] = item;

    })

    this.rawData = data;
    return dict;
  }
  onSocketDataRecieved(data) {
    console.log('message', data)

  }
  subscribe(...id: number[]) {
    const message = {
      data: {
        cryptoIds: id
      },
      id: 'price',
      method: 'subscribe',
    }
    this.socket.send(JSON.stringify(message));
  }
  async startListen() {
    this.data = this.toDictionary(await this.getCoinList());
    this.socket.on('open', () => {
      console.log('Socket started');
    })

    const onSocketData = this.onSocketDataRecieved.bind(this)
    this.socket.on('message', function (data, flags) {
      onSocketData(JSON.parse(data))
    });

  }
  async getCoinList() {
    const { data: listResponse } = await axios.get('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=10000&sortBy=market_cap&sortType=desc&convert=USD,btc,eth&cryptoType=all&tagType=all&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,volume_7d,volume_30d')
    return listResponse.data.cryptoCurrencyList;
  }
  getTopCoins(numberOfItem: number = 10) {
    const allItems = this.rawData?.filter(x => x.cmcRank < 200 && x.isActive)
      .map(x => this.transform(x)).filter(x => x.percentChange24h !== undefined);
    allItems.sort((a, b) => b.percentChange24h - a.percentChange24h);
    return allItems.slice(0, 10)
  }
  getCoinNames() {
    return Object.keys(this.data || {})
  }
  getCoin(coin: string) {
    const rawCoin = this.data[coin.toLowerCase()];
    return this.transform(rawCoin);
  }
  transform(x: any): CoinInfo {
    const usdQuote = x.quotes.find(x => x.name === 'USD');
    return {
      id: x.id,
      slug: x.slug,
      symbol: x.symbol,
      tags: x.tags,
      rank: x.cmcRank,
      lastUpdated: x.lastUpdated,
      ...(usdQuote || {}),
      name: x.name,
    }
  }
}

