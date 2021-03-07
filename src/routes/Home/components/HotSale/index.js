/*
 * @Author: your name
 * @Date: 2020-12-25 15:44:12
 * @LastEditTime: 2021-03-06 17:48:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Home\components\HotSale\index.js
 */
import React, { Component } from 'react'
import { List,WhiteSpace } from 'antd-mobile'
import styles from './index.less'

export default class index extends Component {
  render() {
    const { list =[]} = this.props;
    return (
      <div className={styles.hotSaleWrap}>
        <div className={styles.topLine}>
          <h2 className={styles.title}>热门推荐</h2>
        </div>
        <div className={styles.goodsList}>
          {list.map((item,index) =>{
            return (
              <div className={styles.commodity} key={item.goodId} onClick={()=>{this.props.goToDetail(item.goodId)}} >
                <img src={item.url} className={styles.img} />
                <p className={styles.title}>{item.title}</p>
                <p className={styles.price}>￥{item.price}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
