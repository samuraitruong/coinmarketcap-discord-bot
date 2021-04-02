import { CommandBase } from './base_command';
import { BaseProvider } from '../providers/base_provider';

export class CalcCommand extends CommandBase {
  constructor(provider: BaseProvider) {
    super('/calc', provider)

  }
  async handleInput(input) {
    const args = input.split(' ');

    if (input.match(new RegExp(this.command)) && args.length === 3) {
      const coins = this.provider.getCoinNames();

      const matchedCoin = coins.find(coin => coin === args[1]);

      if (matchedCoin) {
        const coin = await this.provider.getCoin(matchedCoin);
        const requestPercentage = +args[2].replace('%', '');
        const beginPrice = (coin.price * 100 / (100 + coin.percentChange24h));
        if (coin) {
          return [
            `Current Price ${coin.name} = ${coin.price} (${this.percentFormater.format(coin.percentChange24h / 100)})`,
            `Open price = ${this.currencyFormatter.format(beginPrice)}`,
            `${args[2]} => ${this.currencyFormatter.format((requestPercentage + 100) / 100 * beginPrice)}`
          ].join('\n')

        }
      }
    }
    return null;
  }
}
