/*
 * @Author: your name
 * @Date: 2020-12-28 11:28:27
 * @LastEditTime: 2021-04-17 14:24:12
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
  //?????? ????????????
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
    // ????????????????????????20 ???????????????????????????
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
    // ?????????????????????
    if(historyGoodList.length>0) {
      historyGoodList.splice(3,1);
      historyGoodList.forEach(item => {
        const dateList = item.date.split('-');
        // ?????????????????????????????????????????????
        if(year === dateList[0] && month === dateList[1] && days === dateList[2]) {
          //?????????????????????????????????
          //?????????????????????????????????
          let flag = 0;
          newRecord = 0;
          item.goodList.forEach((goodItem,goodIndex) => {
            if(goodItem.goodId === goodDetailInfo.goodId) {
              //????????????????????????????????????????????????????????????,
              flag =1;
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
  // ????????????
  handleBuy = () => {
    const {goodDetailInfo} = this.props;
    const userInfo = storage.get('userInfo')||{};
    if(!userInfo.userId) {
      Toast.info('??????????????????????????????')
      return;
    }
    if(userInfo.userId === goodDetailInfo.userId) {
      Toast.info('?????????????????????????????????')
    }else if(userInfo.autonym === 1){
      Toast.info('??????????????????????????????????????????,????????????');
      setTimeout(()=>{
        this.props.history.push(`/mine/settings/autonym`)
      },2000)
    }else {
      this.props.history.push(`/clearing/${goodDetailInfo.goodId}`)
    }
  }
  //???????????????
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
    // ???????????????
    if( cartGoodList === null || cartGoodList === 'null') {
      let goodList = [];

      goodList.push(tempItem);
      storage.set('cartGoodList',goodList)
    }else {

      cartGoodList.push(tempItem);
      storage.set('cartGoodList',cartGoodList)
    }
    Toast.info('????????????????????????');
    // storage.set('')
  }
  handleLike = (goodId) => {
    const likeList = storage.get('likeList')||[];
    const index = likeList.indexOf(goodId);
    const userInfo = storage.get('userInfo')||{};
    if(!userInfo.userId) {
      Toast.info('??????????????????????????????');
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
      Toast.info('??????????????????????????????');
      return;
    }
    if(userInfo.userId === this.props.goodDetailInfo.userId) {
      Toast.info('??????????????????')
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
      Toast.info('??????????????????????????????');
      return;
    }
    const {goodDetailInfo} = this.props;
    if(userInfo.userId === goodDetailInfo.userId) {
      Toast.info('????????????????????????')
    }else {
      this.props.history.push(`/message/sendMessage/${goodDetailInfo.userId}`)

    }
  }
  handleCollect = (goodId) => {
    const userInfo = storage.get('userInfo')||{};
    const {collectFlag} = this.state;
    if(!userInfo.userId) {
      Toast.info('??????????????????????????????');
      return;
    }

    if(userInfo.userId === this.props.goodDetailInfo.userId) {
      Toast.info('???????????????????????????')
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
          this.state.attentionFlag ?<Button type='default' className={`${styles.btn}`} onClick={()=>this.handleAttention(goodDetailInfo.userId)} >?????????</Button>
          : <Button type='default' className={`${styles.btn}`} onClick={()=>this.handleAttention(goodDetailInfo.userId)}>?????????</Button>
        }
        { goodDetailInfo.userId == userInfo.userId ?
          <div className={styles.info}>
          ????????????
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

          ???{goodDetailInfo.price}
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
            <span className={styles.title}>????????????:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.dealWay,filedType.dealWay)}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>????????????:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.degree,filedType.degree)}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>??????????????????:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.effect,filedType.effect)}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>?????????????????????:</span>
            <span className={styles.content}>{goodDetailInfo.reason}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>??????:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.category,filedType.category)}</span>
          </div>
          <div className={styles.dealInfoItem}>
            <span className={styles.title}>??????????????????:</span>
            <span className={styles.content}>{filedType.getLabel(goodDetailInfo.swap,filedType.swap)}</span>
          </div>
        </div>
        <div className={styles.description}>
          {/* <span className={styles.descriptionTitle}>???????????????</span> */}
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
            <p className={`pMargin0 ${styles.font}`}>??????</p>
          </div>
          <div className={styles.collect}>
            <p
            className={`iconfont  ${this.state.collectFlag ? 'icon-collection-fill' :'icon-collection'} pMargin0  ${styles.bottomIcon}`}
            onClick={()=>this.handleCollect(goodDetailInfo.goodId)}></p>
            <p className={`pMargin0 ${styles.font}`}>??????</p>
          </div>
          <div className={styles.contact} onClick={()=>{this.handleGoToSendMessage()}}>
            <p className={`iconfont   icon-xiaoxi1 pMargin0  ${styles.bottomIcon}`}></p>
            <p className={`pMargin0 ${styles.font}`}>????????????</p>
          </div>

        </div>
        <div className={styles.submitBtn}>
          {/* <button  className={`${styles.btn}`} onClick={()=>{this.handleJoinCart()}}>???????????????</button> */}

          <button className={`${styles.btn}`} onClick={this.handleBuy}>????????????</button>

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
