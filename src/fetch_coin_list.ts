import { CoinMarketCap } from './providers/coinmarketcap';
import fs from 'fs-extra'

(async () => {
  const cmc = new CoinMarketCap();
  // const data = await cmc.getCoinList();
  // fs.writeJSONSync('cmc.json', data, { spaces: 4 })
  await cmc.startListen();
  await cmc.subscribe(1, 2, 3)
  //console.log(data)
})()
