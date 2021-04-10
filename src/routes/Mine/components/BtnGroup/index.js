/*
 * @Author: your name
 * @Date: 2021-02-24 16:42:27
 * @LastEditTime: 2021-04-10 18:36:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\BtnGroup\index.js
 */
import React, { Component } from 'react'
import {WingBlank,Button, Modal,Toast,Steps} from 'antd-mobile'
import storage from '@/utils/storage';
import {connect} from 'dva';
import goTo from '@/utils/goTo';
import styles from './index.less'
const alert = Modal.alert;
const prompt = Modal.prompt;
const Step = Steps.Step;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      filterOrder: 0,
    }
  }
  getOrderList= (userId) => {
    this.props.dispatch({
      type:'mine/getOrderList',
      payload: {
        userId: userId
      }
    })
  }
    // 填写物流单号
    handleFillLogistics = (logisticsNumber,item)=> {
      const userInfo = storage.get('userInfo');
      let fillLogFlag = 0;
      console.log('11');
      // 用于判断置换 双方都需填写物流单号
      if(userInfo.userId === item.seller) {
        fillLogFlag = 1;
      }else {
        fillLogFlag = 2;
      }
      this.props.dispatch({
        type: 'mine/logisticsNumber',
        payload: {
          logisticsNumber,
          orderId:item.orderId,
          fillLogFlag, //
        },
        callback:(res)=> {
          window.location.reload();
          // this.props.history.push('/'+res.url)
        }
      })
    }

    handleGoToDetail = (orderId)=> {
      this.props.history.push(`/orderDetail/${orderId}`)
    }
    handleGoToRefound = (item) => {
      this.props.history.push(`/refoundGood/${item.orderId}`)
    }
    handleAcceptExchange = (item,state) => {
          // this.forceUpdate();
      const userInfo = storage.get('userInfo');

      this.props.dispatch({
        type: 'mine/acceprtExChange',
        payload :{
          orderId: item.orderId,
          state,
        },
        callback: res=> {
          window.location.reload();
          // this.setState({
          //   msg:'test'
          // })
          // setTimeout(()=>{
          // },300);
          // this.props.history.push('/mine/order')
          // this.forceUpdate();
        }
      })
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
    goToPay = (item) => {
      this.props.dispatch({
        type: 'clearing/goToPay',
        payload:{
          orderId:item.orderId,
          goodTitle: item.title
        },
        callback:(res)=> {
          window.location.href=res.url;
          // this.props.history.push('/'+res.url)
        }
      })
    }
    concealOrder = (item) => {
      this.props.dispatch({
        type: 'mine/concealOrder',
        payload:{
          orderId:item.orderId,
        },
        callback:(res)=> {
          window.location.reload();
          // this.props.history.push('/'+res.url)
        }
      })
    }
    delOrder = (item) => {
      const userInfo = storage.get('userInfo');
      const sellerFlag = userInfo.userId === item.seller;
      this.props.dispatch({
        type:'mine/delOrder',
        payload: {
          orderId:item.orderId,
          sellerFlag,
        },
        callback: res=>{
          window.location.reload();
        }
      })
    }
    showLogisticsInfo =(item)=>{
      const userInfo = storage.get('userInfo');
      let fillLogFlag = 0;
      console.log(item);
      // 用于判断置换 双方都需填写物流单号
      if(userInfo.userId === item.seller || item.swap === '1' || item.swap===1) {
        fillLogFlag = 1;
      }else {
        fillLogFlag = 2;
      }
      this.showModal('modal1');
      this.props.dispatch({
        type: 'mine/getLogisticsInfo',
        payload:{
          orderId:item.orderId,
          fillLogFlag
        }
      })
      this.setState({
        'modal1': true,
      });

    }
    // 确认收货
    comfirmGood = (item)=> {
      const userInfo = storage.get('userInfo');
      let state = 4;
      if(item.swap ===0 && item.state !== 12 &&  item.state !== 11&& item.state !== '12' &&  item.state !== '11') {
        if(userInfo.userId===item.seller) {
          state =12;
        }else {
          state =11;
        }
      }
      this.props.dispatch({
        type: 'mine/confirmGood',
        payload:{
          orderId:item.orderId,
          state,
          seller:item.seller
        },
        callback: res=> {
          // this.forceUpdate();
          window.location.reload();
        }
      })
    }
    // 同意退款
    handleAcceptRefound =(item) => {
      this.props.dispatch({
        type: 'mine/acceptReFound',
        payload: {
          orderId:item.orderId,
          price: item.price,
          goodTitle: item.title,
          buyerId:item.buyerId,
        },
        callback: res=>{
          window.location.reload();
        }
      })
    }
    // 退款
    refundGood = (item)=>{
      const userInfo = storage.get('userInfo');
      let fillLogFlag = 0;
      // 用于判断置换 双方都需填写物流单号
      if(userInfo.userId === item.seller || item.swap === '1' || item.swap===1) {
        fillLogFlag = 1;
      }else {
        fillLogFlag = 2;
      }
      this.props.dispatch({
        type: 'mine/refundGood',
        payload:{
          orderId:item.orderId,
          fillLogFlag
        }
      })
    }
    renderModal = ()=> {
      const {logisticsInfo = {}} = this.props;
      const {logisticsName,traces = []} = logisticsInfo;
      return (
        <Modal
        visible={this.state.modal1}
        transparent
        maskClosable={false}
        onClose={this.onClose('modal1')}
        title={logisticsName}
        footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        // afterClose={() => { alert('afterClose'); }}
      >
        <div  style={{ height: 300,width:230, overflow: 'scroll' }}>
          <Steps size="biger" current={1}>
            {traces.map((item,index) => {
              return (
                <Step current={index} title={item.time} description={item.desc} />
              )
            })}

          </Steps>
        </div>
      </Modal>
      )

    }
  // 渲染订单操作栏
  renderBtnGroup = (item)=> {
    const userInfo = storage.get('userInfo');
    let btnGroup = '';
    switch(item.state) {
      case 0:
          btnGroup = (
            <div className={styles.btnGroup}>
              {userInfo.userId ===item.seller
              ? <span>状态：<span className={styles.info}>买家未支付</span></span>
              :<div className={styles.btn}>
              <Button
              type='default'
              className={styles.concealCollect}
              size='small'
                onClick={() =>
                alert('','取消订单', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确定', onPress: () => this.concealOrder(item) },
                ])
                }
              >取消订单</Button>
              <Button type='warning' className={styles.concealCollect}  size='small' onClick={()=>this.goToPay(item)}>去支付</Button>
              </div>}

            </div>
          )
          break;
      case 1:
        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>this.handleGoToRefound(item)}>退款</Button>

            {/* 判断如果是置换 买家也要填写物流 */}
            {
              item.buyer === userInfo.userId && item.swap === 0 && item.logisticsState != 2
              ?<Button  type='default' className={styles.concealCollect}  size='small'
                    onClick={() => prompt('填写物流单号', '物流单号', [
                    { text: '取消' },
                    { text: '确定', onPress: value => this.handleFillLogistics(value,item)},
                  ], 'default', null,['快递单号'])}
                  >填写物流</Button>
            : ''
            }

            {item.seller === userInfo.userId && item.logisticsState != 1
            ?   <Button  type='default' className={styles.concealCollect}  size='small'
                    onClick={() => prompt('填写物流单号', '物流单号', [
                    { text: '取消' },
                    { text: '确定', onPress: value => this.handleFillLogistics(value,item)},
                  ], 'default', null,['快递单号'])}
                  >填写物流</Button>
            : ''}
            {
              item.seller === userInfo.userId && item.logisticsState === 1 ?
              <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(item)}} >查看物流</Button>
              : ''
            }
            {
              item.buyer === userInfo.userId && item.logisticsState === 2 ?
              <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(item)}} >查看物流</Button>
              : ''
            }

          </div>
        );
        break;
      case 2:
        btnGroup = (
          <div className={styles.btnGroup}>
            {
              userInfo.userId === item.seller
              ? <span>状态：<span className={styles.info}>买家取消订单</span></span>
              : <span>状态：<span className={styles.info}>订单已取消</span></span>
            }
          </div>
        );
        break;
      case 3:
        console.log(item.seller !== userInfo.userId);
        console.log(item);
        console.log(item.swap ===0 && item.swapGoodId !== '');
        btnGroup = (
          <div className={styles.btnGroup}>
            {item.seller !== userInfo.userId
            ?<Button type='danger' className={styles.concealCollect}  size='small'  onClick={()=>this.handleGoToRefound(item.orderId)}>退款</Button>
            :''
            }
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(item)}} >查看物流</Button>
            {/* <Button type='primary' className={styles.concealCollect}  size='small' onClick={()=>{this.comfirmGood(item.orderId)}}>确认收货</Button> */}
            {
              item.seller !== userInfo.userId || item.swap ===0 && item.swapGoodId !== ''
              ?
              <Button
              type='primary' className={styles.concealCollect} size='small'
              onClick={() =>
                alert('确认收货', '你确认收货？', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确认', onPress: () => this.comfirmGood(item) },
                ])
              }
            >
              确认收货
            </Button>
             : ''
            }
          </div>
        );
        break;
      case 4:
        btnGroup = (
          <div className={styles.btnGroup}>
            <span>状态：<span className={styles.info}>订单已完成</span></span>
            {/* <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>this.delOrder(item)}>删除订单</Button> */}
          </div>
        );
        break;
        case 5:
          if(item.seller === userInfo.userId) {
            btnGroup = (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>买家取消置换</span></span>
              </div>
            );
          }else {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>已取消置换</span></span>
              </div>
            )
          }
        break;
      case 6:
          if(item.seller === userInfo.userId) {
            btnGroup = (
              <div className={styles.btnGroup}>
                <Button
                type='warning'
                className={styles.concealCollect}
                size='small'
                onClick={() =>
                alert('置换','拒绝置换', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确定', onPress: () => this.handleAcceptExchange(item,8) },
                ])
                }
                >拒绝置换</Button>
               <Button
                          type='primary'
                          className={styles.concealCollect}
                          size='small'
                          onClick={() =>
                    alert('置换','确定置换吗', [
                      { text: '取消', onPress: () => console.log('cancel') },
                      { text: '确定', onPress: () => this.handleAcceptExchange(item,7) },
                    ])
                  }
                          >确认置换</Button>

              </div>
            );
          }else {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <Button
                  type='default'
                  className={styles.conceal}
                  size='small'
                  onClick={() =>
                  alert('置换','确定置换吗', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => this.handleAcceptExchange(item,5) },
                  ])
                }
                >取消置换</Button>
                <span>状态：<span className={styles.info}>等待卖家同意置换</span></span>
              </div>
            )
          }
        break;
        case 7:
          if(item.logisticsState === '0' || item.logisticsState === 0) {
            btnGroup = (
              <div className={styles.btnGroup}>
                <Button type='danger'
                className={styles.concealCollect}
                size='small'
                 onClick={()=>this.handleGoToRefound(item.orderId)}>退货</Button>
                <Button  type='default' className={styles.concealCollect}  size='small'
                    onClick={() => prompt('填写物流单号', '物流单号', [
                    { text: '取消' },
                    { text: '确定', onPress: value => this.handleFillLogistics(value,item)},
                  ], 'default', null,['快递单号'])}
                  >填写物流</Button>
              </div>

            )
            // 卖家已填写   卖家显示 已填写  买家显示 卖家已发货和填写物流按钮
          }else if(item.logisticsState === '1' || item.logisticsState === 1) {
            btnGroup = (
              <div className={styles.btnGroup}>
                {
                  item.seller === userInfo.userId
                  ? <span>状态：<span className={styles.info}>已填写</span></span>
                  : <div className={styles.container}>
                    <span>状态：<span className={styles.info}>卖家已发货</span></span>
                    <Button  type='default' className={styles.concealCollect}  size='small'
                      onClick={() => prompt('填写物流单号', '物流单号', [
                      { text: '取消' },
                      { text: '确定', onPress: value => this.handleFillLogistics(value,item)},
                    ], 'default', null,['快递单号'])}
                    >填写物流</Button>
                  </div>
                }
              </div>

            )
          }else {
             // 买已填写   买家显示 已填写  卖家显示 买家已发货和填写物流按钮
            btnGroup = (
              <div className={styles.btnGroup}>
                {
                  item.seller !== userInfo.userId
                  ? <span>状态：<span className={styles.info}>已填写</span></span>
                  : <div className={styles.container}>
                    <span>状态：<span className={styles.info}>买已发货</span></span>
                    <Button  type='default' className={styles.concealCollect}  size='small'
                      onClick={() => prompt('填写物流单号', '物流单号', [
                      { text: '取消' },
                      { text: '确定', onPress: value => this.handleFillLogistics(value,item)},
                    ], 'default', null,['快递单号'])}
                    >填写物流</Button>
                  </div>
                }
              </div>

            )
          }
        break;
        case 8:
          if(item.seller === userInfo.userId) {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>已拒绝置换</span></span>
              </div>
            )
          }else {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>卖家拒绝置换</span></span>
              </div>
            )
          }
        break;
        case 9:
          if(item.seller === userInfo.userId) {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>买家申请退款</span></span>
                <Button
                type='danger' className={styles.concealCollect} size='small'
                onClick={() =>
                  alert('同意退款', '你确认同意退款？', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确认', onPress: () => this.handleAcceptRefound(item) },
                  ])
                }
              >
                同意退款
              </Button>
              </div>
            )
          }else {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>申请退款中</span></span>

              </div>
            )
          }
        break;
        case 10:
          if(item.seller === userInfo.userId) {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>已同意退款</span></span>
              </div>
            )
          }else {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>退款成功</span></span>
              </div>
            )
          }
        break;
        case 11:
          if(item.seller === userInfo.userId) {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>买家已确认收货</span></span>
                <Button
                type='primary' className={styles.concealCollect} size='small'
                onClick={() =>
                  alert('确认收货', '你确认收货？', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确认', onPress: () => this.comfirmGood(item) },
                  ])
                }
              >
                确认收货
              </Button>
              </div>
            )
          }else {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>已确认收货</span></span>

              </div>
            )
          }
        break;
        case 12:
          if(item.seller !== userInfo.userId) {
            btnGroup =  (
              <div className={styles.btnGroup}>
                <span>状态：<span className={styles.info}>卖家已确认收货</span></span>
                <Button
                type='primary' className={styles.concealCollect} size='small'
                onClick={() =>
                  alert('确认收货', '你确认收货？', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确认', onPress: () => this.comfirmGood(item) },
                  ])
                }
              >
                确认收货
              </Button>
              </div>
            )
          }else {
            btnGroup =  (
              <div className={styles.btnGroup}>
                  <span>状态：<span className={styles.info}>已确认收货</span></span>
              </div>
            )
          }
        break;
      default:

        btnGroup = '';

    }
    return btnGroup;
  }
  render() {
    const {orderInfo} = this.props;
    return (
      <div className={styles.btnGroupWrap}>
        <div className={styles.btnGroupContainer}>
        {this.renderBtnGroup(orderInfo)}
        </div>
        {this.renderModal()}
      </div>
    )
  }
}
const mapStateToProps = (state)=>({
  logisticsInfo: state.mine.logisticsInfo,
})
export default connect(mapStateToProps)(index)
