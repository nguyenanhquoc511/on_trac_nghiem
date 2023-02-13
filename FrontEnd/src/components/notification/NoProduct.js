import React from 'react';
import { Empty } from 'antd';

const NoProduct = () => {
  return (
    <div style={{ height: '300px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '30px', marginTop: '20px', color: '#34248A' }}>
        No Test was found!!
      </h2>
      <Empty description={false} />
    </div>
  );
};

export default NoProduct;
