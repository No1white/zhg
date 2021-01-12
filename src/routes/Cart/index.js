import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import {Checkbox} from 'antd-mobile'
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
  goToClearing = () => {
    this.props.history.push('clearing')
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
        <CheckboxItem  >
        </CheckboxItem>
        {/* <Radio className="my-radio" onChange={e => console.log('checkbox', e)} >全选</Radio> */}
        {
          showMange && (
            <div className={styles.btnWrap}>
              <span className={styles.account}>
                合计： <span className={styles.num}>{totalPrice}</span>
              </span>
              <button className={`circleBtn`} onClick={this.goToClearing}>结算</button>
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
  render() {
    return (
      <div className={styles.cartWrap}>
        <NavBar title ={'购物车'} renderRight = {this.renderNavBarRightPart}></NavBar>
        <CommodityList changeTotalPrice={this.changeTotalPrice} ></CommodityList>
        {this.renderAccount()}
      </div>
    )
  }
}
