import React from 'react';
import { useBarcode } from '@createnextapp/react-barcode';

function App(props) {
  const { inputRef } = useBarcode({
    // value: 'createnextapp',
    value: props.text,
    options: {
      displayValue: false,
      background: 'white',
      width: 1.3,
      height: 10,
      margin: 3,
    }
  });

  return <canvas ref={inputRef} />;
};

export default App;