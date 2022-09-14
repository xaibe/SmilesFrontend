import React from 'react';
import loading from './loading.gif';

function Spinner() {
  return (
    <div>
      <img
        src={loading}
        style={{ width:"100px", display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;