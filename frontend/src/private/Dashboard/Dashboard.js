import React, {useState} from 'react';
import useWebSocket from 'react-use-websocket';

function Dashboard() {

  const [miniTickerState, setMiniTickerState] = useState({});

  const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    onOpen: () => console.log(`Connected to App ws Server`),
    onMessage: () => {
      if(lastJsonMessage){
        if(lastJsonMessage.miniTicker) setMiniTickerState(lastJsonMessage.miniTicker);
      }

    },
    queryParams: {},
    onError: (err) => console.error(err),
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000
  });
  return(
    <React.Fragment>
      {JSON.stringify(miniTickerState)}
    </React.Fragment>
  );
  
}

export default Dashboard;