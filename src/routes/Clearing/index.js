import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import {Checkbox,WingBlank,Switch,List} from 'antd-mobile'
import goTo from '../../utils/goTo'
import CommodityList from './components/CommodityList'
import styles from './index.less'
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMange: true,
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
      }
    }
  }
  showChangeByProperty =(property)=>{
    this.setState({
      [property]: !this.state[property]
   })


  }
  changeTotalPrice = (totalPrice) => {
    this.setState({
      totalPrice
    })
  }
  delGoods = () => {
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
      // return (
      //   <div
      //     className={styles.rightPart}
      //     onClick={()=>{this.showChangeByProperty('showMange')}}
      //     >

      //     管理
      //   </div>
      // )

  }

  renderAccount = ()=> {
    const {showMange,totalPrice} = this.state;
    return (
      <div className={styles.accountWrap}>
        <div></div>
        {/* <Radio className="my-radio" onChange={e => console.log('checkbox', e)} >全选</Radio> */}
        {
          showMange && (
            <div className={styles.btnWrap}>
            <sapn className={styles.goodNum}>共X件</sapn>
              <span className={styles.account}>
                合计： <span className={styles.num}>{totalPrice}</span>
              </span>
              <button className={`circleBtn`}>结算</button>
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
    const { userInfo } = this.state;
    return (
      <WingBlank>
        <div className={styles.addressWrap}>
          <div className={`${styles.addressIcon} `}>
            <sapn className={`${styles.address} bgLinear iconfont icon-dizhi1`}></sapn>
          </div>

          <div className={styles.addressInfo} onClick={()=>{goTo('addressMange',this.props.history)}}>
            <div className={styles.userInfo}>
              <p className={`pMargin0 ${styles.userName}`}>{userInfo.userName}</p>
              <p className={`pMargin0 ${styles.phone}`}>{userInfo.phone}</p>
            </div>
            <div className={styles.addressInfo}>
              {userInfo.address.province}
              {userInfo.address.city}
              {userInfo.address.region}
              {userInfo.address.detail}
            </div>
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
                onChange={() => {
                  this.setState({
                    checked: !this.state.checked,
                });
                }}
                >

                </Switch>
          </div>
        </div>
      </WingBlank>
    )
  }
  render() {
    return (
      <div className={styles.clearingWrap}>
        <List>
          <NavBar history={this.props.history} ></NavBar>
          {this.renderAddress()}
          {this.renderSwitch()}
          <CommodityList changeTotalPrice={this.changeTotalPrice} ></CommodityList>
          {this.renderAccount()}
        </List>
      </div>
    )
  }
}
