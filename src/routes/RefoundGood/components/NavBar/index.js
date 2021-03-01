/*
 * @Author: your name
 * @Date: 2021-02-28 18:49:41
 * @LastEditTime: 2021-02-28 18:54:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\RefoundGood\components\NavBar\index.js
 */
import React, { Component } from 'react'
// import history from '../../utils/history'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  goBack = ()=>{
    this.props.history.goBack()
  }
  render() {
    const {title = ''} = this.props;
    return (
      <div className={styles.navBarWrap} onClick={this.goBack}>
        <div className={styles.backBtn} >
          <span className={`iconfont icon-jiantou ${styles.btn}`}></span>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.rightPart}></div>
      </div>
    )
  }
}
export default index
