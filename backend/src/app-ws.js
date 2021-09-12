const webSocket = require('ws');

function onMessage() {
  console.log(`onMessage: ${data}`);
}

function onError(err) {
  console.error(`onError: ${err.message}`)
}

function onConnection(ws, req){
  ws.on('message', onMessage);
  ws.on('error', onError);
  console.log(`onConnection`)
}

module.exports = (server) => {
  const wss = new webSocket.Server({
    server
  });

  wss.on('connection', onConnection);
  console.log(`App web Socket Server is Running`);
  return wss;
}