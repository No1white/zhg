import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import {Checkbox,WingBlank,Switch,List,ActionSheet,Toast,Button,WhiteSpace} from 'antd-mobile'
import { connect } from 'dva';
import { createForm } from 'rc-form';
import ExchangeCommodity from './components/exchangeCommodity'
import goTo from '../../utils/goTo'
import storage from '@/utils/storage'
import CommodityList from './components/CommodityList'
import BtnGroup from '../Mine/components/BtnGroup'
import styles from './index.less'
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;


class index extends Component {
  constructor(props) {
    const {location:{query =[]},userGoodList} = props;
    const  {goodList = []} = query;
    super(props);
    this.state = {
      showMange: true,
      checked: false,
      totalPrice: 0,
      userInfo: {
        userName: '林',
        phone: '180605707639',
        address: {
          province: '福建省',
          city: '漳州市',
          region: '平和县',
          defail: '高速路口对面'
        }
      },
      remark: '',
      goodList:query,
      userGoodList: userGoodList,
    }

  }
  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));

  componentDidMount() {
    const {match:{params}} = this.props;
    const { orderId = ''} = params;
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type: 'mine/getOrderDetail',
      payload: {
        orderId:orderId,
      }
    });


  }
  showChangeByProperty =(property)=>{
    this.setState({
      [property]: !this.state[property]
   })
  }
  openExchange = ()=> {
    const userInfo = storage.get('userInfo');
    // 获取当前用户上架中的商品
    this.props.dispatch({
      type: 'clearing/getUserGoods',
      payload: {
        userId: userInfo.userId,
      }
    })
      this.setState({
        checked: !this.state.checked,
      })
  }
  showShareActionSheet = () => {
    ActionSheet.showShareActionSheetWithOptions({
      options: this.dataList,
      // title: 'title',
      message: 'I am description, description, description',
    },
    (buttonIndex) => {
      this.setState({ clicked1: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
      // also support Promise
      return new Promise((resolve) => {
        Toast.info('closed after 1000ms');
        setTimeout(resolve, 1000);
      });
    });
  }

  settleAccounts = () => {
    const {goodDetailInfo,userGoodList = []} = this.props;
    const { remark} = this.state;
    const userInfo = storage.get('userInfo');
    const addressList = storage.get('addressList') || [];
    let addressId = '';
    addressList.forEach(item => {
      if(item.checked) {
        addressId = item.addressId
      }
    })

    let swapGoodId = '';
    let swap = 1;  //
    userGoodList.forEach(item => {
      if(item.checked === true) {
        swapGoodId = item.goodId;
        swap = 0;
      }
    })
    this.props.dispatch({
      type:'clearing/createOrder',
      payload: {
        amount:goodDetailInfo.price,
        userId: userInfo.userId,
        goodTitle: goodDetailInfo.title,
        goodId: goodDetailInfo.goodId,
        swapGoodId,
        swap,
        seller: goodDetailInfo.userId, // 卖家id
        remark: remark,
        addressId
      },
      callback:(res)=> {
        window.location.href=res.url;
        // this.props.history.push('/'+res.url)
      }
    })

  }
  changeTotalPrice = (totalPrice) => {
    this.setState({
      totalPrice
    })
  }
  delGoods = () => {
  }
  onRemarkChange = (val) => {
    this.setState({
      remark: val,
    })
  }
  handleUserGoodChecked=  (goodId) => {
    const {userGoodList} = this.props;
    let newGoodList = JSON.parse(JSON.stringify(userGoodList))
    newGoodList.forEach(item =>{
      if(item.goodId === goodId) {
        item.checked=true;
      } else {
        item.checked=false;
      }
    });
    this.props.dispatch({
      type:'clearing/userGoodCheck',
      payload:{
        userGoodList:newGoodList,
      }

    })
  }

  renderNavBarLeftPart = () => {
    return (
      <h2 className={styles.title}>购物车</h2>
    )
  }
  renderNavBarRightPart = () => {
    const {showMange} = this.state;
    if(showMange) {
      return (
        <div
          className={styles.rightPart}
          onClick={()=>{this.showChangeByProperty('showMange')}}>
          管理
        </div>
      )
    } else {
      return (
        <div
          className={styles.rightPart}
          onClick={()=>{this.showChangeByProperty('showMange')}}
          >
          完成
        </div>
      )
    }


  }

  renderAccount = ()=> {
    const {showMange,totalPrice} = this.state;
    const {goodDetailInfo} = this.props;
    return (
      <div className={styles.accountWrap}>
        <div></div>
        {
          showMange && (
            <div className={styles.btnWrap}>
              <span className={styles.account}>
                合计： <span className={styles.num}>￥{goodDetailInfo && goodDetailInfo.price}</span>
              </span>
              <button className={`circleBtn ${styles.btn}`} onClick={this.settleAccounts}>结算</button>
            </div>
          )
        }
        {
          !showMange && (
            <div className={styles.btnWrap}>

              <button className={`circleBtn`} onClick={this.delGoods}>删除</button>
            </div>
          )
        }
      </div>
    )
  }
  renderAddress = () => {
    // const { userInfo } = this.state;
    const { addressInfo ={},sellerAddressInfo={}} = this.props;
    // let addressInfo =  {};
    console.log(sellerAddressInfo);
    return (
      <WingBlank>

        <div className={styles.addressWrap}>
          <div className={`${styles.addressIcon} `}>
            <span className={`${styles.address} bgLinear iconfont icon-dizhi1`}></span>
          </div>

          <div className={styles.addressInfo} >
              <div>
                <div className={styles.userInfo}>
                  <p className={`pMargin0 ${styles.userName}`}>{addressInfo.userName}(买家)</p>
                  <p className={`pMargin0 ${styles.phone}`}>{addressInfo.phone}</p>
                </div>
                <div className={styles.addressInfo}>
                  {addressInfo.province}
                  {addressInfo.city}
                  {addressInfo.region}
                  {addressInfo.detail}
                </div>
              </div>

          </div>
        </div>
        {
          JSON.stringify(sellerAddressInfo) !== '{}' ?

          <div className={styles.addressWrap}>

            <div className={`${styles.addressIcon} `}>
              <span className={`${styles.address} bgLinear iconfont icon-dizhi1`}></span>
            </div>

            <div className={styles.addressInfo} >
                <div>
                  <div className={styles.userInfo}>
                    <p className={`pMargin0 ${styles.userName}`}>{sellerAddressInfo.userName}(卖家)</p>
                    <p className={`pMargin0 ${styles.phone}`}>{sellerAddressInfo.phone}</p>
                  </div>
                  <div className={styles.addressInfo}>
                    {sellerAddressInfo.province}
                    {sellerAddressInfo.city}
                    {sellerAddressInfo.region}
                    {sellerAddressInfo.detail}
                  </div>
                </div>

            </div>
          </div> : ''
        }

      </WingBlank>
    );
  }
  renderSwitch = () => {
    return (
      <WingBlank>
        <div className={styles.switchWrap}>
          <div className={styles.title}>
            置换购
          </div>
          <div className={styles.info}>
            以物换物，或者以物价差价换物
          </div>
          <div className={styles.switchBtn}>

          </div>
        </div>
      </WingBlank>
    )
  }

  renderExchange = ()=> {
    const {userGoodList} = this.props;

    return (
      <WingBlank className={styles.exchangeWrap}>
        <div className={styles.goodList}>
          {userGoodList.map(item => {
            return (
              <div className={styles.goodItem} onClick={()=>{this.handleUserGoodChecked(item.goodId)}}>
                <CheckboxItem checked={item.checked} className={styles.checkBox}></CheckboxItem>
                <img className={styles.goodImg} src={item.imgList[0]}></img>
                <h3 className={styles.goodTitle}>{item.title}</h3>
              </div>
            );
          })}
        </div>
      </WingBlank>
    )
  }
  render() {
    // const {goodList = []} = this.state;
    const {goodInfo,orderInfo,history,exchangeGoodInfo} = this.props;
    const {remark,checked}  =this.state;
    return (
      <div className={styles.clearingWrap}>
        <List>
          <NavBar history={this.props.history} ></NavBar>
          {this.renderAddress()}
          {this.renderSwitch()}
          <CommodityList
          goodList={ [{...goodInfo}]}
          orderInfo={orderInfo}
          changeTotalPrice={this.changeTotalPrice}
          remark={remark}
          history={history}
          onRemarkChange={this.onRemarkChange}
          exchangeGoodInfo={exchangeGoodInfo}></CommodityList>
          <div className={styles.btnGroup}>
          </div>
        </List>
      </div>
    )
  }
}
const indexWrap = createForm()(index)
const mapStateToProps = (state)=> ({
  goodInfo: state.mine.goodInfo,
  orderInfo: state.mine.orderInfo,
  addressInfo: state.mine.addressInfo,
  exchangeGoodInfo: state.mine.exchangeGoodInfo,
  sellerAddressInfo: state.mine.sellerAddressInfo
})
export default connect(mapStateToProps)(indexWrap)
