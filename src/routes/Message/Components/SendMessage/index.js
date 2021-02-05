/*
 * @Author: lsp
 * @Date: 2021-01-25 20:39:20
 * @LastEditTime: 2021-02-05 21:35:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Message\Components\SendMessage\index.js
 */

import React, { Component } from 'react'
import NavBar from '../NavBar/index'
import {List, InputItem, Button} from 'antd-mobile'
import { connect } from 'dva';
import { createForm } from 'rc-form';
import storage from '@/utils/storage'
import io from 'socket.io-client';
import styles from './index.less'
import { message } from 'antd';

const messageList = [

];
const Item = List.Item;
//创建socket连接，http使用ws协议，https使用wss协议
const socket = require('socket.io-client')('http://localhost:3000')
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [

      ]
    }
  }
  componentDidMount() {
    const {match:{params={}}} = this.props;
    console.log(this.props);
    this.props.dispatch({
      type: 'message/getReceiverInfo',
      payload: {
        receiverId: params.receiver
      }
    })
    // 设置在线
    const userInfo =  storage.get('userInfo');
    socket.emit('online',{userId:userInfo.userId,time:new Date().toLocaleString()})
    socket.on('reply_private_chat',this.getMessage);
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
    const { getFieldsValue } = this.props.form;
    const { messageList} = this.state;
    const values = getFieldsValue();
    const userInfo =  storage.get('userInfo');
    const {match:{params={}}} = this.props;
    // const socket = io('http://localhost:3000', {
    //       reconnectionAttempts: 10,
    //       query: {
    //       }
    // })
    console.log(params.receiver);
    const message = {
      sender: userInfo.userId,
      avatar: userInfo.avatar,
      nickName: userInfo.nickName,
      receiver: params.receiver,
      msg: values.msg,
      // sender: '5',
      // receiver: '4',
      // nickName: '测试1',
      // avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2796144188,439704386&fm=26&gp=0.jpg',

    };
      socket.emit('private_chat', message, data => {
        console.log('data=');
        console.log(data);
        messageList.push({
          nickName: userInfo.nickName,
          avatar: data.avatar,
          msg: values.msg,
          createTime:data.createTime,
          // senderPhoto: data.senderPhoto,
          senderOrReceiver: 0,  // 0发送者

        })
        this.setState({
          messageList
        })
      });
      socket.on('reply_private_chat',this.getMessage);
      // message.push({
      //   nickName: userInfo.nickName,
      //   avatar: userInfo.avatar,
      //   msg: values.msg,
      //   createTime:
      // })
      // this.setState({

      // })
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

  }
  getMessage =(data) => {
    console.log('服务端的返回的数据');
    console.log(data);
    const {messageList} = this.state;
    messageList.push({
      nickName: data.nickName,
      avatar: data.avatar,
      msg: data.msg,
      createTime:data.createTime,
      // senderPhoto: data.senderPhoto,
      senderOrReceiver:1,  // 0发送者
    })
    this.setState({
      messageList
    })
  }
  // 消息栏
  messageRender = () => {
    const {messageList} = this.state;
    return(
      <div className={styles.messageListWrap}>
        <div className={styles.messageList}>
          {messageList.map((item,index) => {
            return (
              <div className={styles.messageItem} key={index}>
                <div className={styles.sendMsg}>
                  <div className={styles.info}>
                    {item.senderOrReceiver === 0 ? <span className={styles.timer}>{item.createTime}   {item.nickName}</span>
                    :<span className={styles.timer}>{item.nickName}  {item.createTime}</span>}
                    <div className={styles.msgWrap}>
                      <span>{item.msg}</span>
                      <div className={styles.triangle}></div>
                    </div>
                  </div>
                  <img className={styles.avatar} src={item.avatar}></img>
                </div>
              </div>
            )
          })}

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
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.bottomBtnWrap}>
        <List className={styles.btnGroup}>
          <Item >
          <InputItem
            {...getFieldProps('msg')}
            placeholder="请输入信息"
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
    const {receiverInfo} = this.props;
    return (
      <div className={styles.sendMessageWrap}>
        <NavBar backFlag={true}  title={receiverInfo.nickName} history={this.props.history}></NavBar>
        {this.messageRender()}
        {this.bottomBtnRender()}
      </div>
    )
  }
}
const indexWrap = createForm()(index)
const mapStateToProps = (state) => ({
  receiverInfo: state.message.receiverInfo
})

export default connect(mapStateToProps)(indexWrap)
