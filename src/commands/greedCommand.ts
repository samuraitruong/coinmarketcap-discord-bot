import { CommandBase } from './base_command';
import { BaseProvider } from '../providers/base_provider';
import { MessageAttachment } from 'discord.js';

export class GreedIndexCommand extends CommandBase {
  constructor() {
    super('/greeded', null)

  }
  async handleInput(input) {
    const args = input.split(' ');

    if (input === this.command) {
      //   const f = new MessageAttachment('');
      return {
        //file: [f],
        embed: {
          title: 'Fear and Greeded Index',
          image: {
            url: 'https://alternative.me/crypto/fear-and-greed-index.png?' + new Date().getTime(),
          },
        }
      }
    }
    return null;
  }
}
