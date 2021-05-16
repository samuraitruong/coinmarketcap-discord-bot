import { CommandBase } from './base_command';
import { BaseProvider } from '../providers/base_provider';
import { MessageEmbed } from 'discord.js'
import { basename } from 'node:path';

export class ChartCommand extends CommandBase {
  constructor(provider: BaseProvider) {
    super('/chart', provider, true)

  }
  async handleInput(input: string) {
    const [cmd, coin, period = '30'] = input.split(' ').filter(Boolean).map(x => x.trim());

    if (cmd === this.command) {

      const message = new MessageEmbed();
      message.setImage(`http://coinspot-chart.herokuapp.com/chart_v1?period=${period}&coin=${coin}&lineWidth=1.5`)
        .setTitle(`${coin}    -  ${period}d`)
      return message;
    }
  }
}
