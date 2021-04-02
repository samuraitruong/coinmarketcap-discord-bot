import { CommandBase } from './base_command';
import { BaseProvider } from '../providers/base_provider';

export class TopCoinCommand extends CommandBase {
  constructor(provider: BaseProvider) {
    super('/top', provider)

  }
  async handleInput(input) {
    if (input.match(new RegExp(this.command))) {
      const list = await this.provider.getTopCoins();
      const listMessage = list.map(x => `**${x.symbol}**: 24h = ${x.percentChange24h.toFixed(2)}% 7d = ${x.percentChange7d.toFixed(2)}%`).join('\n')
      return listMessage
    }
    return null;
  }
}
