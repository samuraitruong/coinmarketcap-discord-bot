export interface CoinInfo {
  id: number;
  name: string;
  symbol: string;
  price?: number;
  volume24h?: number;
  volume7d?: number;
  volume30d?: number;
  marketCap?: number;
  percentChange1h?: number;
  percentChange24h?: number;
  percentChange7d?: number;
  lastUpdated?: Date;
  percentChange30d?: number;
  percentChange60d?: number;
  percentChange90d?: number;
  fullyDilluttedMarketCap?: number;
  dominance?: number;
  turnover?: number;
  ytdPriceChangePercentage?: number;
  rank?: number;
  slug?: string;
  tags?: string[]
}


export interface BaseProvider {
  getTopCoins: (numberOfItem?: number) => CoinInfo[];
  getCoinNames: () => string[];
  getCoin: (coin: string) => CoinInfo;
  // getFeeds: (coin: string) => any[]
}
