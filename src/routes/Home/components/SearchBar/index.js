import React, { Component } from 'react';
import {SearchBar} from 'antd-mobile'
import { AutoComplete,Input } from 'antd';
import styles from './index.less';


export default class index extends Component {

  render() {
    const onSearch = (searchText) => {

    };
    const onSelect = (data) => {
      console.log('onSelect', data);
    };
    const onChange = (data) => {
    };
    const options = [
      {label: '123', value:'12'},
      {label: '1', value:'123'},

    ]
    return (
      <div className={styles.searchBar}>
        <div className={styles.search}>
            <AutoComplete
            options={options}
            // style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            className={styles.searchInput}
            placeholder="请输入关键词"
          />
          {/* <input type="text" placeholder={'搜索热词'} className={styles.searchInput} /> */}
          <button className={styles.searchBtn}>搜索</button>
          <span className={`iconfont icon-search ${styles.searchIcon}`} />
        </div>
        {/* <div className={styles.autoComplate}>

        </div> */}

      </div>
    );
  }
}

