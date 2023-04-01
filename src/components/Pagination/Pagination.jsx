import React from 'react';
import { Pagination } from 'antd';

import './Pagination.css';

function Paginations({ maxPage, page, onChangePage }) {
  return (
    <div className="pagination">
      <Pagination
        defaultCurrent={1}
        current={page}
        total={maxPage}
        pageSize={20}
        showSizeChanger={false}
        onChange={(pageNum) => onChangePage(pageNum)}
      />
    </div>
  );
}

export default Paginations;
