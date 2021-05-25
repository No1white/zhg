/*
 * @Author: your name
 * @Date: 2020-12-28 11:28:27
 * @LastEditTime: 2021-05-18 21:18:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\CommodityDetail\index.js
 */
import { Button } from 'antd-mobile'
import React, { Component } from 'react'
import { connect } from 'dva'
import {Toast,Tabs, WhiteSpace, Badge} from 'antd-mobile'
import storage from '@/utils/storage'
import CommodityList from './CommodityList'
import goTo from '@/utils/goTo'
import filedType from '@/routes/Config/const.js'
import NavBar from '../../components/NavBar'
import styles from './index.less'


class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { title: <Badge >全部</Badge> },
        { title: <Badge >在售</Badge> },
        { title: <Badge >已售</Badge> },
      ]

    }
  }
  componentDidMount(){
    const {match : {params: {userId}}} = this.props;
    this.getSellerInfo(userId);
  }
  getSellerInfo = (userId) => {
    this.props.dispatch({
      type: 'seller/getSellerInfo',
      payload: {
        userId,
      }
    })
  }
  // 立即购买
  handleBuy = () => {
    const {goodDetailInfo} = this.props;
    // let tempItem = {
    //   nickName: goodDetailInfo.nickName,
    //   allChecked: false,
    //   userId: goodDetailInfo.userId,
    //   goodList: [
    //     {
    //       goodId: goodDetailInfo.goodId,
    //       title: goodDetailInfo.title,
    //       price: goodDetailInfo.price,
    //       url: goodDetailInfo.imgList[0],
    //       checked: false,
    //     }
    //   ]
    // };
    // let goodList = [];
    // goodList.push(tempItem)
    this.props.history.push(`/clearing/${goodDetailInfo.goodId}`)
    // goTo('/clearing/',this.props.history,goodList);
  }
  //加入购物车
  handleJoinCart = () => {
    const { goodDetailInfo} = this.props;
    const cartGoodList = storage.get('cartGoodList');
    goodDetailInfo.checked =false;
    let tempItem = {
      nickName: goodDetailInfo.nickName,
      allChecked: false,
      userId: goodDetailInfo.userId,
      goodList: [
        {
          goodId: goodDetailInfo.goodId,
          title: goodDetailInfo.title,
          price: goodDetailInfo.price,
          url: goodDetailInfo.imgList[0],
          checked: false,
        }
      ]
    };
    // 购物车为空
    if( cartGoodList === null || cartGoodList === 'null') {
      let goodList = [];

      goodList.push(tempItem);
      storage.set('cartGoodList',goodList)
    }else {

      cartGoodList.push(tempItem);
      storage.set('cartGoodList',cartGoodList)
    }
    Toast.info('成功加入购物车！');
    // storage.set('')
  }
  handleGoToSendMessage = () => {
    const userInfo = storage.get('userInfo');
    const {goodDetailInfo} = this.props;
    this.props.history.push(`/message/sendMessage/${goodDetailInfo.userId}`)
  }
  renderUserInfo = () => {
    const { userInfo } = this.props;
    return (
      <div className={styles.userInfo}>
        <img className={styles.img} src={userInfo.avatar} alt=""/>
        <div className={styles.userName}>
          <p>{userInfo.nickName}</p>
        </div>
      </div>
    )
  }
  renderTabs = () => {
    const {goodList,history} = this.props;
    const {tabs = []} =this.state;
    return (
      <div className={styles.tabWrap}>
          <Tabs tabs={tabs}
            initialPage={1}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
              <CommodityList
                header = {true}
                saleState={-1}
                // page={quertyParams.page}
                // loading={loading}
                history={history}
                addPage={this.addPage}
                getCommodityList={this.getCommodityList}
                commodityList= {goodList}
                // hasMore ={hasMore}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
              <CommodityList
                header = {true}
                saleState={1}
                // page={quertyParams.page}
                // loading={loading}
                history={history}
                addPage={this.addPage}
                getCommodityList={this.getCommodityList}
                commodityList= {goodList}
                // hasMore ={hasMore}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
              <CommodityList
                header = {true}
                saleState={0}
                // page={quertyParams.page}
                // loading={loading}
                history={history}
                addPage={this.addPage}
                getCommodityList={this.getCommodityList}
                commodityList= {goodList}
                // hasMore ={hasMore}
                />
            </div>
          </Tabs>
      </div>
    )
  }
  renderGoodList = () => {
    return (
      <div className={styles.goodList}>
        <div className={styles.goodItem}>

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
          <div className={styles.contact} onClick={()=>{this.handleGoToSendMessage()}}>
            <p className={'iconfont   icon-xiaoxi1 pMargin0'}></p>
            <p className={`pMargin0 ${styles.font}`}>联系商家</p>
          </div>

        </div>
        <div className={styles.submitBtn}>
          {/* <button  className={`${styles.btn}`} onClick={()=>{this.handleJoinCart()}}>加入购物车</button> */}
          <button className={`${styles.btn}`} onClick={this.handleBuy}>立即购买</button>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.commodityWrap}>
        <div className={styles.fixWrap}>
          <NavBar history={this.props.history} ></NavBar>
          {this.renderUserInfo()}
        </div>
        {this.renderTabs()}

        {/* {this.renderBottom()} */}
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  goodList: state.seller.goodList,
  userInfo: state.seller.userInfo
})
export default connect(mapStateToProps)(index)
