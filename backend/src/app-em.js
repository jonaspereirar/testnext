const webSocket = require('ws')
const crypto = require('./utils/crypto')

/* Exchange Monitor 
  - A api da Binence exige um settings default, para isso ele sobe por default
o Settings de um usuario, Pasta Utils/exchange.js - arquivo app-em.js e server configurado para mini Ticker Stream
https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams 
*/
module.exports = (settings, wss) => {

  if(!settings) throw new Error(`Falta preencher as configurações`)

  const exchange = require('./utils/exchange')(settings);

  function broadcast(jsonObject){
    if(!wss || !wss.clients) return;
    wss.clients.forEach(client => {
      if(client.readyState === webSocket.OPEN) {
        client.send(JSON.stringify({ jsonObject }))
      }
    });
  }

  exchange.miniTickerStream((markets) => {
    //console.log(markets);
    broadcast({ miniTicker: markets });
  })
  let book = [];
  exchange.bookStream((order) => {
    if(book.length === 200) {
      broadcast({ book });
      book = [];
    }else book.push(order);

  })

  exchange.userDataStream(balanceData => {
    broadcast({ balance: balanceData })
  },
  executionData => { console.log(executionData) },
  )

  console.log(`App Exchange Monitor is running` );

}