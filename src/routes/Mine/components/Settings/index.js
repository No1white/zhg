/*
 * @Author: your name
 * @Date: 2021-01-13 12:58:06
 * @LastEditTime: 2021-02-18 20:09:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\Settings\index.js
 */
import React, { Component } from 'react'
import {List, Button} from 'antd-mobile'
import goTo from '../../../../utils/goTo'
import storage from '../../../../utils/storage'
import NavBar from '../../../AddressMange/Components/NavBar'
import styles from './index.less'
const Item = List.Item;
class index extends Component {
  constructor(props) {
    super(props);
    const userInfo = storage.get('userInfo') || {};
    this.state = {
      userInfo
    }
  }
  logOut = ()=> {
    storage.remove('userInfo');
    this.props.history.push('/mine')
  }
  renderUserInfo = ()=> {
    const {userInfo} = this.state;
    return (
      <div className={styles.userInfoWrap}>
        <img className={styles.avatar} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww2.sinaimg.cn%2Fmw690%2F001M3Mcbly1gjvrsyggztj61tm1tr15q02.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=88a19dfd703329099310e27998695735'></img>
        <div className={styles.userInfo}>
          <p className={`${styles.userName} pMargin0`}>林5293656</p>
          <p className={styles.phone}>18060570739</p>
        </div>
        <Button
          size='small'
          className={styles.editBtn}
          onClick={()=>{goTo('settings/alterUserInfo',this.props.history)}}>编辑</Button>
      </div>
    )
  }
  renderFuncList = ()=>{
    return (
      <div className={styles.funcListWrap}>
        <List  className={styles.funcList}>
          <Item
            className={`${styles.funcItem}`}
            arrow="horizontal"
            onClick={() => {goTo('/addressMange',this.props.history)}} >我的收货地址</Item>
          <Item className={`${styles.funcItem}`} arrow="horizontal" onClick={() => {}}>账号与安全</Item>
          <Item className={`${styles.funcItem}`} arrow="horizontal" onClick={() => {goTo('/mine/settings/autonym',this.props.history)}}>实名认证</Item>
          <Item className={`${styles.funcItem}`} extra="extra content" arrow="horizontal" onClick={() => {}}>支付设置</Item>
          <Item className={`${styles.funcItem}`} extra="extra content" arrow="horizontal" onClick={() => {}}>问题反馈</Item>
          <Item className={`${styles.funcItem}`} extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
            关于置换购
          </Item>
        </List>
      </div>
    )
  }
  render() {
    const {userInfo} = this.state;
    console.log(userInfo);
    console.log(JSON.stringify(userInfo) == '{}');
    return (
      <div className={styles.settingsWrap}>
        <NavBar styles={{background: '#white'}} title={'设置'} history={this.props.history}></NavBar>
        {this.renderUserInfo()}
        {this.renderFuncList()}
        {
          JSON.stringify(userInfo) !='{}'
          ?  <Button className={`${styles.logOut}`} onClick={this.logOut}>退出登录</Button>
          : <Button className={`${styles.logOut}`} onClick={()=>{goTo('/mine/login',this.props.history)}}>去登录/注册</Button>
        }
        {/* <Button className={`${styles.logOut} ${JSON.stringify(userInfo) !='{}' ?  'showEle' : 'hideEle'}`} onClick={this.logOut}>退出登录</Button> */}
      </div>
    )
  }
}
export default index
