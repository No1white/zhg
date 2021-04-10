import { Toast } from 'antd-mobile';
import React, { Component } from 'react'
import goTo from '../../utils/goTo'
import {connect} from 'dva';
import storage from '../../utils/storage'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    const sUserInfo = storage.get('userInfo') || {};

    this.state = {
      userInfo: {
        userId: sUserInfo.userId ,
        nickName: sUserInfo.nickName,
        avatar: `${sUserInfo.avatar}`,
        phone: sUserInfo.phone,
        collectCount: 0,
        attentionCount: 0,
        brosingHistoryCount: 0,
      }
      // userInfo: {
      //   userId: '林5293656',
      //   nickname: '林5293656',
      //   collectNum: 10, //收藏数
      //   attentionNum: 20, //关注数
      //   brosingHistoryNum: 5, //历史浏览数

      // }
    }
  }
  componentDidMount(){
    this.getCountAll();
    this.getCountHistory();
  }
  authLogin = (url) => {
    const userInfo = storage.get('userInfo') ||{};
    if(JSON.stringify(userInfo) !== '{}'){
      goTo(url,this.props.history)
    }else {
      return ;
    }
  }
  getCountHistory= () => {
    const historyGoodList = storage.get('historyGoodList') || [];
    let brosingHistoryCount = 0;
    historyGoodList.forEach(item => {
      brosingHistoryCount = brosingHistoryCount + item.goodList.length;
    })
    this.setState({
      brosingHistoryCount
    })
  }
  getCountAll = () => {
    const userInfo = storage.get('userInfo') ||{};
    if(JSON.stringify(userInfo) !== '{}') {
      this.props.dispatch({
        type: 'mine/getCountAll',
        payload: {
          userId:userInfo.userId,
        },
        callback: result=>{
          this.setState({
            collectCount: result.collectCount,
            attentionCount: result.attentionCount,
          })
        }
      })
    }

  }
  authLogin = (path) => {
    const userInfo = storage.get('userInfo')||{};
    if(!userInfo.userId) {
      Toast.info('您还没登录，请先登录');
      return;
    }else {
      goTo(path,this.props.history);
    }
  }
  renderUserInfo = ()=> {
    const userInfo = storage.get('userInfo') || {};
    const {autonym} = userInfo;
    const { avatar = 'http://qqguw56d8.hn-bkt.clouddn.com/image/activity/avatar2.jpg'} = userInfo;
    console.log(avatar);
    const {nickName,userId} = userInfo;
    const {collectCount,attentionCount,brosingHistoryCount} = this.state;
    return (
      <div className={styles.userInfoWrap}>
        <div className={styles.settingIconWrap} onClick={()=>{goTo('/mine/settings',this.props.history)}}>
          <span className={`iconfont icon-shezhi ${styles.settingIcon}`}></span>
        </div>
        <div className={styles.userInfo}>
          <img className={styles.avatar}
            src={avatar} />
          <div className={`${styles.userName} ${JSON.stringify(userInfo) == '{}' ? 'hideEle' :'showEle' }`} >
            <p className={styles.userId}>
              {userId}
              <span className={`${styles.label} ${autonym == '1' ? 'showEle' :'hideEle'}`} onClick={()=>{goTo('/mine/settings/autonym',this.props.history)}}>未实名</span>
              <span className={`${styles.label} ${autonym != '1' ? 'showEle' :'hideEle'}`} onClick={()=>{goTo('/mine/settings/autonym',this.props.history)}} onClick={()=>{goTo('/mine/settings/autonym',this.props.history)}}>已实名</span>
            </p>
            <p className={styles.nickName}>昵称：{nickName}</p>

          </div>
          <div className={`${styles.logOut} ${JSON.stringify(userInfo) == '{}' ? 'showEle' :'hideEle' }`}  onClick={()=>{goTo('mine/login',this.props.history)}}>
          未登录,<span className={styles.login}>去登录</span>
          </div>
        </div>
        <div className={styles.userStateBar}>
          <div className={styles.batItem} onClick={()=>{this.authLogin('mine/collect')}}>
            <p className={styles.num}>{collectCount || 0}</p>
            <p className={styles.title}>收藏</p>
          </div>
          <div className={styles.batItem}  onClick={()=>{this.authLogin('mine/attention')}}>
            <p className={styles.num}>{attentionCount || 0}</p>
            <p className={styles.title}>关注</p>
          </div>
          <div className={styles.batItem} onClick={()=>{goTo('mine/history',this.props.history)}}>
            <p className={styles.num}>{brosingHistoryCount}</p>
            <p className={styles.title}>历史浏览</p>
          </div>
          {/* <div className={styles.batItem}>
            <p className={styles.num}>7</p>
            <p className={styles.title}>收藏</p>
          </div> */}
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
            <div className={styles.sale} onClick={()=>{this.authLogin('mine/publish')}}>
              <p  className={`iconfont icon-fabu ${styles.saleIcon}`}></p>
              <p className={styles.saleFont}>我发布的</p>
            </div>
            <div className={styles.sale} onClick={()=>{this.authLogin('mine/saled')}}>
              <p className={`iconfont icon-fabu ${styles.saleIcon}`}></p>
              <p className={styles.saleFont}>我卖出的</p>
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
            <div className={styles.order} onClick={()=>{this.authLogin('mine/order/1')}}>
              <p  className={`iconfont icon-daifahuo ${styles.orderIcon}`}></p>
              <p className={styles.orderFont}>待发货</p>
            </div>
            <div className={styles.order} onClick={()=>{this.authLogin('mine/order/3')}}>
              <p  className={`iconfont icon-wuliu ${styles.orderIcon}`}></p>
              <p className={styles.orderFont}>待收货</p>
            </div>
            <div className={styles.order} onClick={()=>{this.authLogin('mine/order/4')}}>
              <p  className={`iconfont icon-pingjia ${styles.orderIcon}`}></p>
              <p className={styles.orderFont}>已完成</p>
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
const mapStateToProps = (state)=>({

})
export default connect(mapStateToProps)(index);
