import React, { Component } from 'react'
import styles from './index.less'
export default class index extends Component {
  renderUserInfo = ()=> {
    return (
      <div className={styles.userInfoWrap}>
        <div className={styles.userInfo}>
          <img className={styles.avatar}
            src={'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=259804006,3494356645&fm=11&gp=0.jpg'} />
          <div className={styles.userName}>
            <p className={styles.userId}>林5293656</p>
            <p className={styles.nickName}>昵称：林5293656</p>
          </div>
        </div>
        <div className={styles.userStateBar}>
          <div className={styles.batItem}>
            <p className={styles.num}>7</p>
            <p className={styles.title}>收藏</p>
          </div>
          <div className={styles.batItem}>
            <p className={styles.num}>7</p>
            <p className={styles.title}>收藏</p>
          </div>
          <div className={styles.batItem}>
            <p className={styles.num}>7</p>
            <p className={styles.title}>收藏</p>
          </div>
          <div className={styles.batItem}>
            <p className={styles.num}>7</p>
            <p className={styles.title}>收藏</p>
          </div>
        </div>
      </div>
    )
    }
  renderSaleInfo = () => {
    return (
      <div className={styles.saleInfoWrap}>
        <div className={styles.saleInfo}>
          <h2 className={styles.saleTitle}>
            发布与卖出
          </h2>
          <div className={styles.info}>
            <div className={styles.sale}>
              <p  className={`iconfont icon-fabu ${styles.saleIcon}`}></p>
              <p className={styles.saleFont}>我发布的 0</p>
            </div>
            <div className={styles.sale}>
              <p className={`iconfont icon-fabu ${styles.saleIcon}`}></p>
              <p className={styles.saleFont}>我卖出的 0</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderOrderInfo = ()=> {
    return (
      <div className={styles.orderInfoWrap}>
        <div className={styles.orderInfo}>
          <h2 className={styles.orderTitle}>
            我的订单
          </h2>
          <div className={styles.info}>
            <div className={styles.order}>
              <p  className={`iconfont icon-daifahuo ${styles.orderIcon}`}></p>
              <p className={styles.orderFont}>待发货</p>
            </div>
            <div className={styles.order}>
              <p  className={`iconfont icon-wuliu ${styles.orderIcon}`}></p>
              <p className={styles.orderFont}>待收货</p>
            </div>
            <div className={styles.order}>
              <p  className={`iconfont icon-pingjia ${styles.orderIcon}`}></p>
              <p className={styles.orderFont}>评价</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.mineWrap}>
        {this.renderUserInfo()}
        {this.renderSaleInfo()}
        {this.renderOrderInfo()}
      </div>
    )
  }
}
