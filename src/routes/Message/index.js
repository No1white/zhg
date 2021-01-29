/*
 * @Author: lsp
 * @Date: 2021-01-25 19:44:25
 * @LastEditTime: 2021-01-27 20:47:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Message\index.js
 */
import React, { Component } from 'react'
import MessageList from './Components/MessageList'
import NavBar from './Components/NavBar'

import styles from './index.less'

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className={styles.messageWrap}>
        <NavBar history={this.props.history} title={'消息'}></NavBar>

        <MessageList history={this.props.history}></MessageList>
      </div>
    )
  }
}
export default index
