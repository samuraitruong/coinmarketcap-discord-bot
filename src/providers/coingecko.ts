import axios from 'axios';
import cheerio from 'cheerio';
import WebSocket from 'ws';
import { BaseProvider, CoinInfo } from './base_provider';
import { CoinGeckoClient } from 'coingecko-api-v3'

export class CoinGecko implements BaseProvider {
  private client = new CoinGeckoClient();
  constructor() {
  }

  getTopCoins(n: number) {
    return [] as CoinInfo[]
  }
  getCoinNames() {
    return []
  }
  getCoin(coin: string) {
    return null;
  }
  async getTrending() {
    return this.client.trending();
  }
}

