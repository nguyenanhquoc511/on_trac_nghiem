import React from 'react';
import { Pagination } from 'antd';

const Paginate = ({ setCurPage, curPage, totalPage }) => {
  return (
    <div className="center-paginate">
      <Pagination
        showSizeChanger={false}
        current={curPage}
        onChange={(page) => setCurPage(page)}
        total={totalPage * 10}
      />
    </div>
  );
};

export default Paginate;
