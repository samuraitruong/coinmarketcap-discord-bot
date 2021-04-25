import { TopCoinCommand } from './top_coin';
import { CoinMarketCap } from '../providers/coinmarketcap';
import { CoinInfoCommand } from './coin_info';
import { CalcCommand } from './cal_command';
import { TwitterFeedCommand } from './feed_info';
import { Twitter } from '../providers/twiter';
import { TrendingCommand } from './trending';
import { CoinGecko } from '../providers/coingecko';
import { GreedIndexCommand } from './greedCommand';

const defaultProvider = new CoinMarketCap();
export const trendingCommand = new TrendingCommand(new CoinGecko());

export default [
  new TopCoinCommand(defaultProvider),
  new CoinInfoCommand(defaultProvider),
  new CalcCommand(defaultProvider),
  new TwitterFeedCommand(new Twitter(process.env.TWITTER_TOKEN)),
  trendingCommand,
  new GreedIndexCommand()
]
