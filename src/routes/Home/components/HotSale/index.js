import { List } from 'antd-mobile'
import React, { Component } from 'react'

import styles from './index.less'

export default class index extends Component {
  render() {
    const goodList = [
      {
        id: 1,
        title:'羽绒服粉色立领面包服棉衣外套女装冬季韩版设计感单排扣宽松外搭',
        price: '59.5',
        sale: 2132,
        url: '//gd2.alicdn.com/imgextra/i2/872666374/O1CN01WJzVuC1wxL9yHbbsA_!!872666374.jpg'
      },
      {
        id: 2,
        title:'羽绒服粉色立领面包服棉衣外套女装冬季韩版设计感单排扣宽松外搭',
        price: '59.5',
        sale: 2132,
        url: '//gd2.alicdn.com/imgextra/i2/872666374/O1CN01WJzVuC1wxL9yHbbsA_!!872666374.jpg'
      },
      {
        id: 3,
        title:'羽绒服粉色立领面包服棉衣外套女装冬季韩版设计感单排扣宽松外搭',
        price: '59.5',
        sale: 2132,
        url: '//gd2.alicdn.com/imgextra/i2/872666374/O1CN01WJzVuC1wxL9yHbbsA_!!872666374.jpg'
      },
      {
        id: 4,
        title:'羽绒服粉色立领面包服棉衣外套女装冬季韩版设计感单排扣宽松外搭',
        price: '59.5',
        sale: 2132,
        url: '//gd2.alicdn.com/imgextra/i2/872666374/O1CN01WJzVuC1wxL9yHbbsA_!!872666374.jpg'
      }
    ]
    return (
      <div className={styles.hotSaleWrap}>
        <div className={styles.topLine}>
          <h2 className={styles.title}>热门推荐</h2>
        </div>
        <div className={styles.goodsList}>
          {goodList.map(item =>{
            return (
              <div className={styles.commodity}>
                <img src={item.url} className={styles.img} />
                <p className={styles.title}>{item.title}</p>
                <p className={styles.price}>{item.price}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
