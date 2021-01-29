/*
 * @Author: your name
 * @Date: 2021-01-27 20:47:35
 * @LastEditTime: 2021-01-27 21:26:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Message\Components\NavBar\index.js
 */
import React, { Component } from 'react'
import styles from './index.less'
export default class index extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {title,renderRight,renderLeft,backFlag=false} = this.props;
    return (
      <div className={styles.headerWrap}>
        <div className={styles.fixWrap}>
          <div className={styles.top}>
            <div className={styles.left} onClick={()=>{this.props.history.goBack()}}>
               <span className={`iconfont icon-jiantou ${styles.btn} ${backFlag ? 'showEle' : 'hideEle'}`}></span>
            </div>
            <div className={styles.middle} >
            <h2 className={styles.title}>{title}</h2>
            </div>
            <div className={styles.right} >
              {renderRight && renderRight()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
