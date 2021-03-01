import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import {Checkbox,WingBlank,Switch,List,ActionSheet,Toast, WhiteSpace} from 'antd-mobile'
import { connect } from 'dva';
import { createForm } from 'rc-form';
import ExchangeCommodity from './components/exchangeCommodity'
import goTo from '../../utils/goTo'
import storage from '@/utils/storage'
import CommodityList from './components/CommodityList'
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
    const { goodId = ''} = params;
    const userInfo = storage.get('userInfo');
    // 获取商品详细信息
    this.props.dispatch({
      type: 'goodDetail/getGoodDetailInfo',
      payload: {
        goodId: goodId,
      }
    });
    // 获取用户地址信息
    this.props.dispatch({
      type: 'clearing/getAddress',
      payload: {
        userId: userInfo.userId,
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
        addressId,
        price: goodDetailInfo.price,
      },
      callback:(res)=> {
        window.location.href=res.url;
        // this.props.history.push('/'+res.url)
      }
    })
  //   this.props.dispatch({
  //     type:'clearing/trans',
  //     payload: {
  //       amount:goodDetailInfo.price,
  //       type: 1,  //支付宝
  //       goodId: goodDetailInfo.goodId,

  //     },
  //     callback:(res)=> {
  //       console.log(this.props.history);
  //       window.location.href=res.url;
  //       // this.props.history.push('/'+res.url)
  //     }
  // })
    // this.props.dispatch({
    //     type:'clearing/sendPayRequest',
    //     payload: {
    //       userId: userInfo.userId,

    //     },


    // })
    // this.props.dispatch({
    //   type: 'clearing/',
    //   payload: {
    //     sellter: goodDetailInfo.userId, //卖家id
    //     buyer: userInfo.userId,
    //     goodId: goodDetailInfo.goodId,
    //     price: goodDetailInfo.price,
    //     remarks: remarks,
    //   }
    // })
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
        {/* <Radio className="my-radio" onChange={e => console.log('checkbox', e)} >全选</Radio> */}
        {
          showMange && (
            <div className={styles.btnWrap}>
            {/* <sapn className={styles.goodNum}>共X件</sapn> */}
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
    let addressInfo =  {};
    storage.get('addressList') && storage.get('addressList').forEach(item =>{
      if(item.checked) {
        addressInfo=item;
      }
    })
    return (
      <WingBlank>

        <div className={styles.addressWrap}>
          <div className={`${styles.addressIcon} `}>
            <sapn className={`${styles.address} bgLinear iconfont icon-dizhi1`}></sapn>
          </div>

          <div className={styles.addressInfo} onClick={()=>{goTo('/addressMange',this.props.history)}}>
            {
              JSON.stringify(addressInfo) === '{}' ? <div>您，还没有添加地址</div>:
              <div>
                <div className={styles.userInfo}>
                  <p className={`pMargin0 ${styles.userName}`}>{addressInfo.userName}</p>
                  <p className={`pMargin0 ${styles.phone}`}>{addressInfo.phone}</p>
                </div>
                <div className={styles.addressInfo}>
                  {addressInfo.province}
                  {addressInfo.city}
                  {addressInfo.region}
                  {addressInfo.detail}
                </div>
              </div>
            }

          </div>
          <div className={`${styles.arrow}  iconfont icon-jiantou1`}></div>
      </div>
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
            <Switch
                checked={this.state.checked}
                onChange={this.openExchange}
                >

                </Switch>
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
    const {goodDetailInfo} = this.props;
    const {remark,checked}  =this.state;
    return (
      <div className={styles.clearingWrap}>
        <List>
          <NavBar history={this.props.history} ></NavBar>
          {this.renderAddress()}
          {this.renderSwitch()}
          {checked && this.renderExchange()}
          <CommodityList
          goodList={ [{...goodDetailInfo}]}
          changeTotalPrice={this.changeTotalPrice}
          remark={remark}
          onRemarkChange={this.onRemarkChange}></CommodityList>
          {this.renderAccount()}
        </List>
      </div>
    )
  }
}
const indexWrap = createForm()(index)
const mapStateToProps = (state)=> ({
  goodDetailInfo: state.goodDetail.goodDetailInfo,
  userGoodList: state.clearing.userGoodList,
  addressInfo: state.clearing.addressInfo,
})
export default connect(mapStateToProps)(indexWrap)
