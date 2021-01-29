/*
 * @Author: lsp
 * @Date: 2021-01-25 20:39:20
 * @LastEditTime: 2021-01-29 18:07:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Message\Components\SendMessage\index.js
 */

import React, { Component } from 'react'
import NavBar from '../NavBar/index'
import {List, InputItem, Button} from 'antd-mobile'
import io from 'socket.io-client';
import styles from './index.less'

const messageList = [

];
const Item = List.Item;
//创建socket连接，http使用ws协议，https使用wss协议
const socket = require('socket.io-client')('http://localhost:3000')
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

    // var sokcet = new io()
    // 发送消息
    // socket.emit('CHAT_SEND', {}, {})

  // socket.on('connection', function(socket){
  //   socket.on('chat message', function(msg){
  //     console.log('message: ' + msg);
  //   });
  // });
  }
  sendMsg = ()=> {
    // const socket = io('http://localhost:3000', {
    //       // reconnectionAttempts: 10,
    //       // query: {
    //       //      uid: this.state.user.uid
    //       // }
    // })
    // socket.emit('message',{type:'online',time:new Date().toLocaleString()})
    // socket.on('news', function (data) {
    //   console.log(data);
    //   socket.emit('my other event', { my: 'data' });
    // });
    //   console.log('2');
    //   socket.emit('online', '123')
    //   const message = {
    //     sender: '赵敏',
    //     receiver: '聂小倩',
    //     text: '测试',
    //   };
    //   socket.emit('message', message, data => {
    //     console.log('data');
    //   });
    let name = window.prompt('请输入昵称');
    socket.emit('message',{type:'content',content:'123'})
    socket.emit('message',{type:'online',name,time:new Date().toLocaleString()})

  }
  // 消息栏
  messageRender = () => {
    return(
      <div className={styles.messageListWrap}>
        <div className={styles.messageList}>
          <div className={styles.messageItem}>
            <div className={styles.sendMsg}>
              <div className={styles.info}>
                <span className={styles.timer}>2021年1月27日21:01:05 xxx</span>
                <div className={styles.msgWrap}>
                  <span>消息XXXXXXXXXXXXXX</span>
                  <div className={styles.triangle}></div>
                </div>
              </div>
              <img className={styles.avatar} src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2796144188,439704386&fm=26&gp=0.jpg'></img>
            </div>
          </div>
          <div className={styles.messageItem}>
            <div className={styles.receiveMsg}>
              <div className={styles.info}>
                <span className={styles.timer}>xxx  2021年1月27日21:01:05 </span>
                <div className={styles.msgWrap}>
                  <span>消息XXXXXXXXXXXXXX</span>
                  <div className={styles.triangle}></div>
                </div>
              </div>
              <img className={styles.avatar} src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2796144188,439704386&fm=26&gp=0.jpg'></img>
            </div>
          </div>
        </div>

      </div>
    )
  }
  // 底部工具栏
  bottomBtnRender = ()=> {
    return (
      <div className={styles.bottomBtnWrap}>
        <List className={styles.btnGroup}>
          <Item >
          <InputItem
            // {...getFieldProps('input3')}
            placeholder="no label"
            className={styles.msgInput}
          />
          <Button type={'primary'} size='small' className={styles.sendMsgBtn}
            onClick={()=>{this.sendMsg()}}>发送</Button>
          </Item>
        </List>
    </div>
    )
  }
  render() {
    return (
      <div className={styles.sendMessageWrap}>
        <NavBar backFlag={true}  title='用户名' history={this.props.history}></NavBar>
        {this.messageRender()}
        {this.bottomBtnRender()}
      </div>
    )
  }
}
export default index
