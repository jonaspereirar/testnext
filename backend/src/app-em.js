const webSocket = require('ws')
const crypto = require('./utils/crypto')

/* Exchange Monitor 
  - A api da Binence exige um settings default, para isso ele sobe por default
o Settings de um usuario, Pasta Utils/exchange.js - arquivo app-em.js e server configurado para mini Ticker Stream
https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams 
*/
module.exports = (settings, wss) => {

  if(!settings) throw new Error(`Falta preencher as configurações`)

  settings.secretKey = crypto.decrypt(settings.secretKey);
  const exchange = require('./utils/exchange')(settings);

  exchange.miniTickerStream((markets) => {
    //console.log(markets);
    if(!wss || !wss.clients) return;
    wss.clients.forEach(client => {
      if(client.readyState === webSocket.OPEN) {
        client.send(JSON.stringify({ miniTicker: markets }))
      }
    })
  })
  let book = [];
  exchange.bookStream((order) => {
    if(!wss || !wss.clients) return;
    if(book.length === 200) {
      wss.clients.forEach(client => {
        if(client.readyState === webSocket.OPEN) {
          client.send(JSON.stringify({ book }))
        }
      });
      book = [];
    }else book.push(order);

  })

  console.log(`App Exchange Monitor is running` );

}