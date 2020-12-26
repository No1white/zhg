import React, { Component } from 'react';
import NavBar from '../../Compnents/NavBar'
import SearchBar from '../../Compnents/SearchBar'
import { createForm } from 'rc-form';
import { List, InputItem } from 'antd-mobile'
import styles from './index.less';

class index extends Component {

  renderHeader = () => {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.headerWrap}>
        <div className={styles.top}>
          <div className={styles.left}>
            <h2 className={styles.title}>置换购</h2>
          </div>
          <div className={styles.middle}></div>
          <div className={styles.right}></div>
        </div>
        {/* <div className={styles.searchBar}>
          <div className={styles.search}>
            <input type="text" className={styles.searchInput} />
            <button className={styles.searchBtn}></button>
          </div>
        </div> */}
        <SearchBar />
        123
      </div >
    )
  }
  render() {
    return (
      <div className={styles.homeWrap}>
        {this.renderHeader()}

      </div>
    )
  }
}
const HomeWrap = createForm()(index)
export default HomeWrap
