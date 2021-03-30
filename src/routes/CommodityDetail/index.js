/*
 * @Author: your name
 * @Date: 2020-12-28 11:28:27
 * @LastEditTime: 2021-03-30 18:35:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\CommodityDetail\index.js
 */
import { Button } from 'antd-mobile'
import React, { Component } from 'react'
import { connect } from 'dva'
import {Toast} from 'antd-mobile'
import storage from '@/utils/storage'
import goTo from '@/utils/goTo'
import filedType from '@/routes/Config/const.js'
import NavBar from '../../components/NavBar'
import styles from './index.less'
import goodDetail from '../../models/goodDetail'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeFlag: false,
      collectFlag: false,
      attentionFlag:false,
    }
  }
  componentDidMount(){
    const {match : {params: {goodId}}} = this.props;
    this.getGoodDetailInfo(goodId);
    this.addHistoryGood();
    this.addBrose(goodId);
    setTimeout(()=>{
      this.getCollectFlag();
    },100)
    // this.getAttention();
  }
  componentWillUnmount(){
  }
  getCollectFlag = ()=>{
    const {goodDetailInfo} = this.props;
    const userInfo = storage.get('userInfo')||{};
    if(!userInfo.userId) {
      return;
    }else {
      this.props.dispatch({
        type: 'goodDetail/getCollectFlag',
        payload: {
          userId:userInfo.userId,
          goodId:goodDetailInfo.goodId,
          sellerId: goodDetailInfo.userId,
        },
        callback: result => {
          this.setState({
            collectFlag: result.collectFlag,
            attentionFlag: result.attentionFlag,
          })
        }
      })
    }
  }
  getAttention = () => {
    const {goodDetailInfo} = this.props;
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type: 'goodDetail/getAttentionFlag',
      payload: {
        sellerId:goodDetailInfo.userId,
        userId:userInfo.userId,
      }
    })
  }
  addBrose = (goodId)=> {
    // const {goodDetailInfo} = this.props;
    this.props.dispatch({
      type: 'goodDetail/addBrouse',
      payload: {
        goodId: goodId,
      }
    })
  }
  //处理 历史记录
  addHistoryGood = ()=> {
    const {goodDetailInfo} = this.props;
    const historyGoodList = storage.get('historyGoodList')||[];
    setTimeout(()=>{
      this.isInGoodList(res=>{
      storage.set('historyGoodList',res);
      })

    },1000)
  }
  isInGoodList = (callback)=> {
    // 如果历史记录大于20 则删除最后一条记录
    const {goodDetailInfo} = this.props;
    const historyGoodList = storage.get('historyGoodList')||[];
    const newGoodList = historyGoodList[0] && historyGoodList[0].goodList||[];
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth()+1).toString();
    const days = date.getDate().toString();
    const {imgList,price,goodId} = goodDetailInfo;
    let tempObj = {
      imgList,
      price,
      goodId,
    };
    let exist = 1;
    let newRecord = 1;
    // 如果还没有记录
    if(historyGoodList.length>0) {
      historyGoodList.splice(3,1);
      historyGoodList.forEach(item => {
        const dateList = item.date.split('-');
        // 如果今天已经有浏览记录了则插入
        if(year === dateList[0] && month === dateList[1] && days === dateList[2]) {
          //今天已经有浏览器记录了
          //判断今天是否已经浏览过
          let flag = 0;
          newRecord = 0;
          item.goodList.forEach((goodItem,goodIndex) => {
            if(goodItem.goodId === goodDetailInfo.goodId) {
              //如果已经浏览过删除记录，添加到数组第一条,
              flag =1;
              console.log(goodIndex);
              item.goodList.splice(goodIndex,1);
              item.goodList.unshift(tempObj);
            }
          });

          if(flag ===0) {
            newGoodList.unshift(tempObj);
          }
        }else {

        }

      })
      if(newRecord ===1) {
        historyGoodList.unshift({
          date:`${year}-${month}-${days}`,
          goodList: [{...tempObj}]
        })
      }
    }else {
      historyGoodList.unshift({
        date:`${year}-${month}-${days}`,
        goodList: [{...tempObj}]
      })
    }

    callback(historyGoodList)

  }
  getGoodDetailInfo = (goodId) => {
    this.props.dispatch({
      type: 'goodDetail/getGoodDetailInfo',
      payload: {
        goodId: goodId
      }
    });
  }
  goToSellerInfo = (sellerId) => {
    this.props.history.push(`/seller/${sellerId}`)
  }
  // 立即购买
  handleBuy = () => {
    const {goodDetailInfo} = this.props;
    const userInfo = storage.get('userInfo')||{};
    if(!userInfo.userId) {
      Toast.info('您还未登录，请先登录')
      return;
    }
    if(userInfo.userId === goodDetailInfo.userId) {
      Toast.info('不能购买自己发布的商品')
    }else {
      this.props.history.push(`/clearing/${goodDetailInfo.goodId}`)
    }
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
  handleLike = (goodId) => {
    const likeList = storage.get('likeList')||[];
    const index = likeList.indexOf(goodId);
    const userInfo = storage.get('userInfo')||{};
    if(!userInfo.userId) {
      Toast.info('您还未登录，请先登录');
      return;
    }

    if(index!==-1) {
      likeList.splice(index,1);
    }else {
      likeList.push(goodId);
    }
    this.setState({
      likeFlag: likeList.indexOf(goodId)!==-1,
    })
    storage.set('likeList',likeList);
  }
  handleAttention = (sellerId)=> {
    const userInfo = storage.get('userInfo')||{};
    const {attentionFlag} = this.state;
    if(!userInfo.userId) {
      Toast.info('您还未登录，请先登录');
      return;
    }
    if(userInfo.userId === this.props.goodDetailInfo.userId) {
      Toast.info('不能关注自己')
      return ;
    }
    this.props.dispatch({
      type:'goodDetail/attentionUser',
      payload: {
        sellerId,
        userId:userInfo.userId,
        attentionFlag,
      },
      callback: result => {
        this.setState({
          attentionFlag:result.attentionFlag,
        })
      }
    })
  }
  handleGoToSendMessage = () => {
    const userInfo = storage.get('userInfo')||{};
    if(!userInfo.userId) {
      Toast.info('您还未登录，请先登录');
      return;
    }
    const {goodDetailInfo} = this.props;
    if(userInfo.userId === goodDetailInfo.userId) {
      Toast.info('不能向自己发消息')
    }else {
      this.props.history.push(`/message/sendMessage/${goodDetailInfo.userId}`)

    }
  }
  handleCollect = (goodId) => {
    const userInfo = storage.get('userInfo')||{};
    const {collectFlag} = this.state;
    if(!userInfo.userId) {
      Toast.info('您还未登录，请先登录');
      return;
    }

    if(userInfo.userId === this.props.goodDetailInfo.userId) {
      Toast.info('不能收藏自己的商品')
      return ;
    }
    this.props.dispatch({
      type:'goodDetail/collectGood',
      payload: {
        goodId,
        userId:userInfo.userId,
        collectFlag,
      },
      callback: result => {
        this.setState({
          collectFlag:result.collectFlag,
        })
      }
    })
  }
  renderUserInfo = () => {
    const { goodDetailInfo,collectFlag=false,attentionFlag=false } = this.props;
    const userInfo = storage.get('userInfo')||{};
    return (
      <div className={styles.userInfo} >
        <div className={styles.userInfoContainer} onClick={()=>{this.goToSellerInfo(goodDetailInfo.userId)}}>
          <img className={styles.img} src={goodDetailInfo.avatar} alt=""/>
          <div className={styles.userName}>
            <p>{goodDetailInfo.nickName}</p>
          </div>
        </div>

        {
          this.state.attentionFlag ?<Button type='default' className={`${styles.btn}`} onClick={()=>this.handleAttention(goodDetailInfo.userId)} >已关注</Button>
          : <Button type='default' className={`${styles.btn}`} onClick={()=>this.handleAttention(goodDetailInfo.userId)}>关注他</Button>
        }
        { goodDetailInfo.userId == userInfo.userId ?
          <div className={styles.info}>
          我的商品
        </div>
        :''
        }
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
          {labels.map((item,index) => {
            return (
              <span className={styles.label} key={index}>{item} </span>
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
          {/* <span className={styles.descriptionTitle}>详细信息：</span> */}
          {imgList.map((item,index) => {
            return (
              <img className={styles.img} src={item} key={index} ></img>
            )
          })}

        </div>
      </div>
    )
  }
  renderBottom = () => {
    const {goodDetailInfo,collectFlag=false} =this.props;
    const userInfo = storage.get('userInfo');
    return (
      <div className={styles.bottomWrap}>
        <div className={styles.collectBtn}>
          <div className={styles.like}>
            <p className={`iconfont ${this.state.likeFlag ? 'icon-dianzan' : 'icon-dianzan1'}  pMargin0 ${styles.bottomIcon}`} onClick={()=>this.handleLike(goodDetailInfo.goodId)}></p>
            <p className={`pMargin0 ${styles.font}`}>点赞</p>
          </div>
          <div className={styles.collect}>
            <p
            className={`iconfont  ${this.state.collectFlag ? 'icon-collection-fill' :'icon-collection'} pMargin0  ${styles.bottomIcon}`}
            onClick={()=>this.handleCollect(goodDetailInfo.goodId)}></p>
            <p className={`pMargin0 ${styles.font}`}>收藏</p>
          </div>
          <div className={styles.contact} onClick={()=>{this.handleGoToSendMessage()}}>
            <p className={`iconfont   icon-xiaoxi1 pMargin0  ${styles.bottomIcon}`}></p>
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
        <NavBar history={this.props.history} ></NavBar>
        {this.renderUserInfo()}
        {this.renderCommodityInfo()}
        {this.renderBottom()}
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  goodDetailInfo: state.goodDetail.goodDetailInfo,
  collectFlag: state.goodDetail.collectFlag,
  attentionFlag: state.goodDetail.attentionFlag,
})
export default connect(mapStateToProps)(index)
