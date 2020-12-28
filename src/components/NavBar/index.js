import React, { Component } from 'react'
import styles from './index.less'
export default class index extends Component {
  render() {
    return (
      <div className={styles.navBarWrap}>
        <div className={styles.backBtn}>
          <span className={`iconfont icon-jiantou ${styles.btn}`}></span>
        </div>
      </div>
    )
  }
}
