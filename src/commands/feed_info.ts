import { CommandBase } from './base_command';
import { Twitter } from '../providers/twiter';

export class TwitterFeedCommand extends CommandBase {
  constructor(private twitter: Twitter) {
    super('/tweet', null)
  }

  async handleInput(input: string) {
    if (input.match(new RegExp(this.command))) {
      const coin = input.split(' ')[1];
      if (!coin) return undefined;

      const feeds = await this.twitter.searchCoinFeeds(coin)
      return feeds.map(x => `https://twitter.com/i/web/status/${x.id}`).join('\n\n')
    }
  }
}
