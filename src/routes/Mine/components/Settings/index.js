/*
 * @Author: your name
 * @Date: 2021-01-13 12:58:06
 * @LastEditTime: 2021-03-30 17:12:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\Settings\index.js
 */
import React, { Component } from 'react'
import {List, Button, Toast,Modal} from 'antd-mobile'
import goTo from '../../../../utils/goTo'
import {connect} from 'dva'
import storage from '../../../../utils/storage'
import NavBar from '../../../AddressMange/Components/NavBar'
import styles from './index.less'
const Item = List.Item;

const prompt = Modal.prompt;
class index extends Component {
  constructor(props) {
    super(props);
    const userInfo = storage.get('userInfo') || {};
    this.state = {
      userInfo,
      modal1:false,
    }
  }
  componentDidMount(){
    const userInfo = storage.get('userInfo') || {};
    if(JSON.stringify(userInfo) == '{}') {
      Toast.info('您还未登录,请先登录');
      this.props.history.push('/mine')
    }
  }
  logOut = ()=> {
    storage.remove('userInfo');
    storage.remove('addressList');
    storage.remove('historyGoodList');
    storage.remove('likeList');
    this.props.history.push('/mine')
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  fillApi = (value) => {
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type:'mine/fillAliPayId',
      payload:{
        aliPayId:value,
        userId:userInfo.userId,
      }
    })
  }
  renderUserInfo = ()=> {
    const userInfo = storage.get('userInfo') || {};
    return (
      <div className={styles.userInfoWrap}>
        <img className={styles.avatar || ''} src={userInfo.avatar}></img>
        <div className={styles.userInfo}>
          <p className={`${styles.userName} pMargin0`}>{userInfo.nickName}</p>
          <p className={styles.phone}>{userInfo.phone}</p>
        </div>
        <Button
          size='small'
          className={styles.editBtn}
          onClick={()=>{goTo('settings/alterUserInfo',this.props.history)}}>编辑</Button>
      </div>
    )
  }
  renderFuncList = ()=>{
    const userInfo = storage.get('userInfo')||{};
    return (
      <div className={styles.funcListWrap}>
        <List  className={styles.funcList}>
          <Item
            className={`${styles.funcItem}`}
            arrow="horizontal"
            onClick={() => {goTo('/addressMange',this.props.history)}} >我的收货地址</Item>
          <Item className={`${styles.funcItem}`} arrow="horizontal" onClick={() => {goTo('/mine/updatePwd',this.props.history)}}>修改密码</Item>
          <Item className={`${styles.funcItem}`} arrow="horizontal" onClick={() => {goTo('/mine/updatePhone',this.props.history)}}>更换手机号</Item>
          <Item className={`${styles.funcItem}`} arrow="horizontal" onClick={() => {goTo('/mine/settings/autonym',this.props.history)}}>实名认证</Item>
          <Item className={`${styles.funcItem}`} extra="extra content" arrow="horizontal"
            onClick={() => prompt(`请输入支付宝账号id
            例如2088621955303871`,`当前aliPayId${userInfo.aliPayId}`,
            [
              {
                text: '关闭',
                onPress: value => new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 100);
                }),
              },
              {
                text: '确认',
                onPress: value => new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve();
                    this.fillApi(value);

                  }, 100);
                  // setTimeout(() => {
                  //   reject();


                  // }, 300);
                }),
              },
            ], 'default', null, ['input your name'])}
          >支付设置</Item>
          <Item className={`${styles.funcItem}`} extra="extra content" arrow="horizontal" onClick={() => {}}>问题反馈</Item>
          <Item
            className={`${styles.funcItem}`}
            extra="1.0.0"
            align="top"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={this.showModal('modal1')}>
            关于置换购
          </Item>
        </List>
      </div>
    )
  }
  renderModal = ()=> {
    return (
      <Modal
      visible={this.state.modal1}
      transparent
      maskClosable={false}
      onClose={this.onClose('modal1')}
      title="作者信息"
      footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
      wrapProps={{ onTouchStart: this.onWrapTouchStart }}

    >
      <div style={{ height: 100, overflow: 'scroll' }}>
        作者：林舒平<br/>
        vx: 林5292820
      </div>
    </Modal>
    )
  }
  render() {
    const {userInfo} = this.state;

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
        {this.renderModal()}
        {/* <Button className={`${styles.logOut} ${JSON.stringify(userInfo) !='{}' ?  'showEle' : 'hideEle'}`} onClick={this.logOut}>退出登录</Button> */}
      </div>
    )
  }
}
export default connect()(index)
