import { TopCoinCommand } from './top_coin';
import { CoinMarketCap } from '../providers/coinmarketcap';
import { CoinInfoCommand } from './coin_info';
import { CalcCommand } from './cal_command';

const defaultProvider = new CoinMarketCap();

export default [
  new TopCoinCommand(defaultProvider),
  new CoinInfoCommand(defaultProvider),
  new CalcCommand(defaultProvider)
]
