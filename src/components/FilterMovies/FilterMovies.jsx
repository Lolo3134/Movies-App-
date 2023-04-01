import { Fragment } from 'react';
import { debounce } from 'lodash';
import { Input } from 'antd';

const FilterMovies = ({ onSearch }) => {
  const onChangeValue = debounce((value) => {
    onSearch(value);
  }, 1000);

  return (
    <Fragment>
      <Input placeholder={'Type to search...'} onChange={(e) => onChangeValue(e.target.value)} />
    </Fragment>
  );
};

export default FilterMovies;
