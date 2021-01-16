import React, { Component } from 'react'
import {List, Button} from 'antd-mobile'
import goTo from '../../utils/goTo'
import NavBar from '../AddressMange/Components/NavBar'
import styles from './index.less'
const Item = List.Item;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  renderUserInfo = ()=> {
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
            onClick={() => {goTo('addressMange',this.props.history)}} >我的收货地址</Item>
          <Item className={`${styles.funcItem}`} arrow="horizontal" onClick={() => {}}>账号与安全</Item>
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
    return (
      <div className={styles.settingsWrap}>
        <NavBar styles={{background: '#white'}} title={'设置'} history={this.props.history}></NavBar>
        {this.renderUserInfo()}
        {this.renderFuncList()}
        <Button className={styles.logOut}>退出登录</Button>
      </div>
    )
  }
}
export default index
