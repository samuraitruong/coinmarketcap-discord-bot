import axios from 'axios';
import { CoinMarketCap } from './providers/coinmarketcap';
export class Scheduler {
  constructor(private cmc: CoinMarketCap) {
    setInterval(this.updateGist.bind(this), 5 * 60 * 1000)
  }
  public addInterval(handler: () => void, interval: number) {
    setInterval(handler, interval)
  }
  private async updateGist() {
    const data = this.cmc.rawData;
    console.log('Update gist')
    const GIST_TOKEN = process.env.GIST_AUTH_TOKEN;
    const GIST_ID = process.env.GIST_ID || '5c110628518dfd563a63212eb4599d00'
    if (GIST_TOKEN && GIST_ID) {
      try {
        const res = await axios.patch('https://api.github.com/gists/' + GIST_ID, {
          files: {
            "cmc.json": {
              content: JSON.stringify(data, null, 4)
            }
          }
        }, {
          maxContentLength: 100000000,
          maxBodyLength: 1000000000,
          headers: {
            authorization: GIST_TOKEN
          }
        })
        console.log('Gits updated: ', res.data.url)
      } catch (err) {
        console.log(err)
      }
    }
  }

}
