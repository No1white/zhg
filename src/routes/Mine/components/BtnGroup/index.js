/*
 * @Author: your name
 * @Date: 2021-02-24 16:42:27
 * @LastEditTime: 2021-02-24 16:43:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\BtnGroup\index.js
 */
import React, { Component } from 'react'
import {WingBlank,Button, Modal,Toast} from 'antd-mobile'
import storage from '@/utils/storage';
import goTo from '@/utils/goTo';
import styles from './index.less'

const alert = Modal.alert;
const prompt = Modal.prompt;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  // 渲染订单操作栏
  renderBtnGroup = (state,item)=> {
    const userInfo = storage.get('userInfo');
    console.log(item);
    let btnGroup = '';
    switch(state) {
      case 0:
          btnGroup = (
            <div className={styles.btnGroup}>
              <Button type='warning' className={styles.concealCollect}  size='small'>去支付</Button>
            </div>
          )
          break;
      case 1:
        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='default' className={styles.concealCollect}  size='small'>退款</Button>
          </div>
        )
      case 2:
        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='default' className={styles.concealCollect}  size='small'>退款</Button>

            {item.seller === userInfo.userId
            ?     <Button  type='default' className={styles.concealCollect}  size='small'
                    onClick={() => prompt('填写物流单号', '物流单号', [
                    { text: '取消' },
                    { text: '确定', onPress: value => this.handleFillLogistics(value,item.orderId)},
                  ], 'default', null,['快递单号'])}
                  >填写物流</Button>
            : ''}
          </div>
        );
        break;
      case 3:
        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='danger' className={styles.concealCollect}  size='small'>退款</Button>
            <Button type='default' className={styles.concealCollect}  size='small' >查看物流</Button>
            <Button type='primary' className={styles.concealCollect}  size='small'>确认收货</Button>
          </div>
        );
        break;
      case 4:
        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='default' className={styles.concealCollect}  size='small'>删除订单</Button>
          </div>
        );
        break;
      case 6:
        btnGroup = (
          <div className={styles.btnGroup}>
            <Button
              type='primary'
              className={styles.concealCollect}
              size='small'
              onClick={() =>
        alert('置换','确定置换吗', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确定', onPress: () => this.handleAcceptExchange(item.orderId) },
        ])
      }
              >确认置换</Button>
          </div>
        );
        break;
      default:

        btnGroup = '';

    }
    return btnGroup;
  }
  render() {
    return (
      <div className={styles.btnGroupWrap}>
        {this.renderBtnGroup()}
      </div>
    )
  }
}
export default index
