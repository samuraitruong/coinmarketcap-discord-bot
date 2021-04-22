import { CommandBase } from './base_command';
import { CoinGecko } from '../providers/coingecko';

export class TrendingCommand extends CommandBase {
  constructor(private cg: CoinGecko) {
    super('/trending', null)

  }
  async handleInput(input, sorted = false) {
    if (input === this.command) {
      const trending = await this.cg.getTrending();
      const sortedList = sorted ? trending.coins.sort((a, b) => a.item.market_cap_rank - b.item.market_cap_rank) :
        trending.coins;
      return sortedList.map(x => `${x.item.symbol}  ${"-".padStart(6 - x.item.symbol.length)}   ${x.item.name} [#${sorted ? "" : x.item.market_cap_rank}]`).join('\n')
    }
  }
}
