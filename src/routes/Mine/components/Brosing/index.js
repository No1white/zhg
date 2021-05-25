/*
 * @Author: your name
 * @Date: 2021-01-16 17:09:23
 * @LastEditTime: 2021-05-21 13:31:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\Brosing\index.js
 */
import React, { Component } from 'react'
import {WingBlank,Button} from 'antd-mobile'
import storage from '@/utils/storage'
import {connect} from 'dva';
import NavBar from '../../../AddressMange/Components/NavBar'
import styles from './index.less'

// 历史浏览
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  goToDetail = (goodId) => {
    this.props.history.push(`/commodityDetail/${goodId}`)
  }
  renderBrosingList = () => {
    const hisoryList = storage.get('historyGoodList') || [];
    return (
      <div className={styles.brosingList}>
        {hisoryList.map((item,index) => {
          return (
            <div className={styles.brosingItem} key={index}>
              <span className={styles.date}>{item.date}</span>
              <div className={styles.goodList}>
                {item.goodList.map(goodItem =>{
                  return (
                    <div className={styles.goodItem} onClick={()=>this.goToDetail(goodItem.goodId)} key={goodItem.goodId}>
                      <img className={styles.goodImg} src={goodItem.imgList && goodItem.imgList[0]}></img>
                      <p className={`${styles.price} themeColor `}>￥{goodItem.price}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

      </div>
    )
  }
  render() {
    return (

        <div className={styles.brosingWrap}>
          <NavBar history={this.props.history} title={'历史浏览'}></NavBar>
          {this.renderBrosingList()}
        </div>

    )
  }
}
export default connect()(index);
