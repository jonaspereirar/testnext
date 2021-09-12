const database = require('./db');
const app = require('./app');
const settingsRepository = require('./repositories/settingsRepository');
const appEm = require('./app-em')

/* A api da Binence exige um settings default, para isso ele sobe por default
o Settings de um usuario, Pasta Utils/exchange.js - arquivo app-em.js e server configurado para mini Ticker Stream
https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams 
*/
settingsRepository.getDefaultSettings()
.then(settings => {
  appEm(settings);
  app.listen(process.env.PORT, () => {
    console.log('App is running.')
  })
})
.catch(err => {
  console.error(err)
})

