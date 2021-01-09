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
          {list.map(item =>{
            return (
              <div className={styles.commodity} onClick={()=>{this.props.goToDetail(item.id)}} key={item.id}>
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
