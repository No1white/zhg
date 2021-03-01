/*
 * @Author: lsp
 * @Date: 2021-01-25 19:44:25
 * @LastEditTime: 2021-02-19 19:15:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Message\index.js
 */
import React, { Component } from 'react'
import MessageList from './Components/MessageList'
import {connect} from 'dva';
import storage from '@/utils/storage'
import goTo from '@/utils/goTo'
import NavBar from './Components/NavBar'

import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type:'message/getMessageList',
      payload: {
        userId: userInfo.userId
      }
    })
  }
  renderRight = ()=> {
    return (
      <div>
        <span className={`iconfont icon-shezhi`}></span>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.messageWrap}>
        <NavBar renderRight={this.renderRight} history={this.props.history} title={'消息'}></NavBar>

        <MessageList messageList={this.props.messageList} history={this.props.history}></MessageList>
      </div>
    )
  }
}
const mapStateToProps = (state)=>({
  messageList: state.message.messageList
})
export default connect(mapStateToProps)(index)
