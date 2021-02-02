/*
 * @Author: your name
 * @Date: 2020-12-28 11:28:27
 * @LastEditTime: 2021-02-02 21:59:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\CommodityDetail\index.js
 */
import { Button } from 'antd-mobile'
import React, { Component } from 'react'
import { connect } from 'dva'
import filedType from '@/routes/Config/const.js'
import NavBar from '../../components/NavBar'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    const {match : {params: {goodId}}} = this.props;
    this.getGoodDetailInfo(goodId);
  }
  getGoodDetailInfo = (goodId) => {
    this.props.dispatch({
      type: 'goodDetail/getGoodDetailInfo',
      payload: {
        goodId: goodId
      }
    })
  }
  renderUserInfo = () => {
    const { goodDetailInfo } = this.props;
    return (
      <div className={styles.userInfo}>
        <img className={styles.img} src={goodDetailInfo.avatar} alt=""/>
        <div className={styles.userName}>
          <p>{goodDetailInfo.nickName}</p>
        </div>
      </div>
    )
  }
  renderCommodityInfo = () => {
    const { goodDetailInfo } = this.props;
    const { labels = [],imgList =[]} = goodDetailInfo;
    return (
      <div className={styles.commodityInfoWrap}>
        <p className={styles.price}>

          ￥{goodDetailInfo.price}
        </p>
        <div className={styles.labels}>
          {labels.map(item => {
            return (
              <sapn className={styles.label}>{item}</sapn>
            )
          })}
          <h3 className={styles.title}>{goodDetailInfo.title}</h3>
          <p>{goodDetailInfo.dep}</p>

        </div>
        <div className={styles.dealInfoList}>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>交易方式:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.dealWay,filedType.dealWay)}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>新旧程度:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.degree,filedType.degree)}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>有无影响使用:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.effect,filedType.effect)}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>影响使用的原因:</span>
            <span className={styles.content}>{goodDetailInfo.reason}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>类别:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.category,filedType.category)}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>是否接受置换:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.swap,filedType.swap)}</span>
          </div>
        </div>
        <div className={styles.description}>
          {/* <sapn className={styles.descriptionTitle}>详细信息：</sapn> */}
          {imgList.map(item => {
            return (
              <img className={styles.img} src={item}></img>
            )
          })}

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
        <NavBar history={this.props.history} ></NavBar>
        {this.renderUserInfo()}
        {this.renderCommodityInfo()}
        {this.renderBottom()}
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  goodDetailInfo: state.goodDetail.goodDetailInfo
})
export default connect(mapStateToProps)(index)
