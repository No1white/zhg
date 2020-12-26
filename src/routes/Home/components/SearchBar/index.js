import React, { Component } from 'react';
import styles from './index.less';


export default class index extends Component {
  render() {
    return (
      <div className={styles.searchBar}>
        <div className={styles.search}>
          <input type="text" placeholder={'搜索热词'} className={styles.searchInput} />
          <button className={styles.searchBtn}>搜索</button>
          <span className={`iconfont icon-search ${styles.searchIcon}`} />
        </div>
      </div>
    );
  }
}

