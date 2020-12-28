import { Button } from 'antd-mobile'
import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import styles from './index.less'
export default class index extends Component {
  renderUserInfo = () => {
    return (
      <div className={styles.userInfo}>
        <img className={styles.img} src={'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=259804006,3494356645&fm=11&gp=0.jpg'} alt=""/>
        <div className={styles.userName}>
          <p>1231231232</p>
        </div>
      </div>
    )
  }
  renderCommodityInfo = () => {
    const label = ['全新','95新']
    return (
      <div className={styles.commodityInfoWrap}>
        <p className={styles.price}>￥300</p>
        <div className={styles.labels}>
          {label.map(item => {
            return (
              <sapn className={styles.label}>{label[0]}</sapn>
            )
          })}
          <sapn className={styles.title}>山地车</sapn>
        </div>
        <div className={styles.description}>
          <p>1233333333333333333333333333
          33333333333333333333333</p>
          <img className={styles.img} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww1.sinaimg.cn%2Fmw690%2F0068LpS2gy1ge1fnj3hmdj30jg0jgwi8.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611719830&t=5b0728711f510d3db877ed4f560f4730'></img>
        </div>
      </div>
    )
  }
  renderBottom = () => {
    return (
      <div className={styles.bottomWrap}>
        <div className={styles.collectBtn}>
          <div className={styles.like}>
            <p className={`iconfont icon-dianzan1 pMargin0`}></p>
            <p className={`pMargin0 ${styles.font}`}>点赞</p>
          </div>
          <div className={styles.collect}>
            <p className={'iconfont icon-collection pMargin0'}></p>
            <p className={`pMargin0 ${styles.font}`}>收藏</p>
          </div>
        </div>
        <div className={styles.submitBtn}>
          <button  className={`${styles.btn}`}>加入购物车</button>
          <button className={`${styles.btn}`}>立即购买</button>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.commodityWrap}>
        <NavBar ></NavBar>
        {this.renderUserInfo()}
        {this.renderCommodityInfo()}
        {this.renderBottom()}
      </div>
    )
  }
}
