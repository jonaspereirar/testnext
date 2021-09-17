import React from 'react';

function BookTicker(props) {

  return(
    <React.Fragment>
    {`${JSON.stringify(props.data)}`}
    </React.Fragment>
  );
}

export default BookTicker;