/*
 * @Author: your name
 * @Date: 2021-02-23 16:53:38
 * @LastEditTime: 2021-05-19 14:45:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhgServerf:\zhg\zhg\src\routes\Mine\components\NavBar\index.js
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
    console.log(this.props);
    if(this.props.backUrl) {
      this.props.history.push(this.props.backUrl)
    }else {
      this.props.history.goBack()
    }
  }
  // goTo = ()=>{
  //   this.props.history.push('')
  // }
  render() {
    const {title, renderRight} = this.props;
    return (
      <div className={styles.navBarWrap} >
        <div className={styles.backBtn} onClick={this.goBack} >
          <span className={`iconfont icon-jiantou ${styles.btn}`}></span>
        </div>
        <div className={styles.navBarTitle}>{title}</div>
        <div className={styles.rightPart} >
          {renderRight && renderRight()}
        </div>
      </div>
    )
  }
}
export default index
