import React, { Component } from 'react';
import styles from './index.less';


export default class index extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className={styles.searchBar}>
        <div className={styles.search}>
          <input type="text" className={styles.searchInput} />
          <button className={styles.searchBtn}>搜索</button>

        </div>
        <span className={'iconfont icon-wode2'}>123</span>
      </div>
    );
  }
}

