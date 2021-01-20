import React, { Component } from 'react'
import {connect} from 'dva'
import {List,InputItem} from 'antd-mobile'
import NavBar from '../../../../../AddressMange/Components/NavBar'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    console.log(this.props);
  }
  renderUserInfo = () => {
    return (
      <div className={styles.userInfoWrap}>
        <div className={styles.userInfo}>
          <img className={styles.avatar} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613130562&t=80e6018e2afc8c56f4166a482f658cc8'></img>
          <List  className={styles.userInfoList}>
          <InputItem
            className={styles.userInfoItem}
            // {...getFieldProps('autofocus')}
            clear
            placeholder="auto focus"
            ref={el => this.autoFocusInst = el}
          >账号</InputItem>
          <InputItem
            className={styles.userInfoItem}
            // {...getFieldProps('focus')}
            clear
            placeholder="click the button below to focus"
            ref={el => this.inputRef = el}
          >昵称</InputItem>
          <List.Item>
            <div
              style={{ width: '100%', color: '#ff6b28', textAlign: 'center' }}
              onClick={this.handleClick}
            >
              修改
            </div>
          </List.Item>
        </List>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.alterUserInfoWrap}>
        <NavBar title={'个人信息'} history={this.props.history}></NavBar>
        {this.renderUserInfo()}
      </div>
    )
  }
}
export default connect()(index)
