import axios from 'axios'

export class Twitter {
  private configs = {
    headers: {
      authorization: ''
    }
  }
  constructor(private token) {
    this.configs.headers.authorization = 'Bearer ' + token
  }
  async searchCoinFeeds(coin: string) {
    const url = 'https://api.twitter.com/2/tweets/search/recent?query=%23' + coin
    const res = await axios.get(url, this.configs);
    return res.data.data;
  }
}
