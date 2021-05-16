import { CommandBase } from './base_command';
import { BaseProvider } from '../providers/base_provider';
import { MessageEmbed } from 'discord.js'
import { basename } from 'node:path';

export class ChartCommand extends CommandBase {
  constructor(provider: BaseProvider) {
    super('/chart', provider, true)

  }
  async handleInput(input: string) {
    const [cmd, coin, period] = input.split(' ').filter(Boolean).map(x => x.trim());
    const getMessage = (p: string | number) => {
      const message = new MessageEmbed();
      message.setImage(`http://coinspot-chart.herokuapp.com/chart_v1?period=${p}&coin=${coin}&lineWidth=1.5`)
        .setTitle(`${coin}    -  ${p}d`)
      return message;
    }
    if (cmd === this.command) {
      const periods = period.split(',') || [1, 3, 7, 15, 30, 60, 'max'].reverse();

      return periods.map(x => getMessage(x))
    }
  }
}
