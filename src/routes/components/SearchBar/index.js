import React, { Component } from 'react';
import { AutoComplete,Input } from 'antd';
import styles from './index.less';


export default class index extends Component {
  render() {
    const onSearch = (searchText) => {

    };
    let timeOut = '';
    const onSelect = (data) => {
      this.setState({
        word:data,
      })
    };
    const onChange = (data) => {
      if(timeOut) {
        clearTimeout(timeOut)
      }
      if(timeOut) {
        timeOut= ''
      }
      timeOut = setTimeout(()=> {
        this.props.getHotWords(data);
        this.setState({
          word:data,
        })
      },300);



    };
    const { options = [],handleSearchBtn,word} = this.props;
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
              placeholder={word}
            />
          {/* <input type="text" placeholder={'搜索热词'} className={styles.searchInput} /> */}
          <button className={styles.searchBtn}>搜索</button>
          <span className={`iconfont icon-search ${styles.searchIcon}`} />
        </div>
      </div>
    );
  }
}

