import { TopCoinCommand } from './top_coin';
import { CoinMarketCap } from '../providers/coinmarketcap';
import { CoinInfoCommand } from './coin_info';
import { CalcCommand } from './cal_command';
import { TwitterFeedCommand } from './feed_info';
import { Twitter } from '../providers/twiter';

const defaultProvider = new CoinMarketCap();

export default [
  new TopCoinCommand(defaultProvider),
  new CoinInfoCommand(defaultProvider),
  new CalcCommand(defaultProvider),
  new TwitterFeedCommand(new Twitter(process.env.TWITTER_TOKEN))
]
