import { CommandBase } from './base_command';
import { CoinGecko } from '../providers/coingecko';

export class TrendingCommand extends CommandBase {
  constructor(private cg: CoinGecko) {
    super('/trending', null)

  }
  async handleInput(input) {
    if (input === this.command) {
      const trending = await this.cg.getTrending();
      return trending.coins.map(x => `${x.item.symbol}  ${"-".padStart(6 - x.item.symbol.length)}   ${x.item.name} [#${x.item.market_cap_rank}]`).join('\n')
    }
  }
}
