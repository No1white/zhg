import React, { Component } from 'react'
import styles from './index.less'
import { List, Checkbox,WingBlank,InputItem,Button,Modal,Steps} from 'antd-mobile';
import { createForm } from 'rc-form';
import storage from '@/utils/storage'
const alert = Modal.alert;
const prompt = Modal.prompt;
const Step = Steps.Step;
class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalPrice: 0,
    }
  }
  onChange = (userId) => {
    const {goodList} = this.state;
    goodList.forEach(item =>{
      if(item.userId === userId) {
        const allChecked = !item.allChecked;
        item.allChecked = allChecked;
        item.goodList.forEach(listItem => {
          listItem.checked = allChecked
        })
      }
    })
    this.setState({
      goodList
    })
    this.reCount()

  }
  handleGoToRefound = (orderId) => {
    this.props.history.push(`/refoundGood/${orderId}`)
  }
  goToPay = (orderId,item) => {
    const {goodList = []} = this.props;
    this.props.dispatch({
      type: 'clearing/goToPay',
      payload:{
        orderId,
        goodTitle: goodList[0].title
      },
      callback:(res)=> {
        window.location.href=res.url;
        // this.props.history.push('/'+res.url)
      }
    })
  }
  getOrderList= (userId) => {
    this.props.dispatch({
      type:'mine/getOrderList',
      payload: {
        userId: userId
      }
    })
  }
  showLogisticsInfo =(orderId,item)=>{
    const userInfo = storage.get('userInfo');
    let fillLogFlag = 0;
    // 用于判断置换 双方都需填写物流单号
    if(userInfo.userId === item.seller  || item.swap === '1' || item.swap===1) {
      fillLogFlag = 1;
    }else {
      fillLogFlag = 2;
    }
    this.showModal('modal1');
    this.props.dispatch({
      type: 'mine/getLogisticsInfo',
      payload:{
        orderId,
        fillLogFlag,
      }
    })
    this.setState({
      'modal1': true,
    });

  }
  // 确认收货
  comfirmGood = (orderId)=> {
    this.props.dispatch({
      type: 'mine/confirmGood',
      payload:{
        orderId,
      },
      callback: res=> {
        // this.forceUpdate();
        window.location.reload();
      }
    })
  }
  // 同意退款
  handleAcceptRefound =(orderId,item) => {
    this.props.dispatch({
      type: 'mine/acceptReFound',
      payload: {
        orderId,
        price: item.price,
        goodTitle: item.title,
      },
      callback: res=>{
        window.location.reload();
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

  handleFillLogistics = (logisticsNumber,orderId,item)=> {
    const userInfo = storage.get('userInfo');
    let fillLogFlag = 0;
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
        orderId,
        fillLogFlag, //
      },
      callback:(res)=> {
        window.location.reload();
        // this.props.history.push('/'+res.url)
      }
    })
  }
  // 退款
  refundGood = (orderId)=>{
    this.props.dispatch({
      type: 'mine/refundGood',
      payload:{
        orderId,
      }
    })
  }
  // 渲染弹窗
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
  renderBtnGroup = (state,item)=> {
    const userInfo = storage.get('userInfo');
    const {orderInfo} = this.props;
    const fillLogisticsFlag = item.swap===0 ? true : false;
    let btnGroup = '';
    switch(state) {
      // 0 未支付  显示支付按钮
      case 0:
          btnGroup = (
            <div className={styles.btnGroup}>
              {
                userInfo.userId !== orderInfo.seller
                ? <Button type='warning' className={styles.concealCollect}  size='small' onClick={()=>this.goToPay(orderInfo.orderId,orderInfo)}>去支付</Button>
                : ''
              }
            </div>
          )
          break;
      // 已支付 退款 卖家显示 填写物流
      case 1:

        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>this.handleGoToRefound(orderInfo.orderId)}>退款</Button>

            {/* 判断如果是置换 买家也要填写物流 */}
            {
              item.buyer === userInfo.userId && item.swap === 0 && item.logisticsState != 2
              ?<Button  type='default' className={styles.concealCollect}  size='small'
                    onClick={() => prompt('填写物流单号', '物流单号', [
                    { text: '取消' },
                    { text: '确定', onPress: value => this.handleFillLogistics(value,orderInfo.orderId,orderInfo)},
                  ], 'default', null,['快递单号'])}
                  >填写物流</Button>
            : ''
            }

            {item.seller === userInfo.userId && item.logisticsState != 1
            ?   <Button  type='default' className={styles.concealCollect}  size='small'
                    onClick={() => prompt('填写物流单号', '物流单号', [
                    { text: '取消' },
                    { text: '确定', onPress: value => this.handleFillLogistics(value,orderInfo.orderId,orderInfo)},
                  ], 'default', null,['快递单号'])}
                  >填写物流</Button>
            : ''}
            {
              item.seller === userInfo.userId && item.logisticsState === 1 ?
              <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(orderInfo.orderId,orderInfo)}} >查看物流</Button>
              : ''
            }
            {
              item.buyer === userInfo.userId && item.logisticsState === 2 ?
              <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(orderInfo.orderId,orderInfo)}} >查看物流</Button>
              : ''
            }

          </div>
        );
        break;
      case 2:
        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>this.handleGoToRefound(orderInfo.orderId)}>退款</Button>
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(orderInfo.orderId,orderInfo)}} >查看物流</Button>

          </div>
        )
        break;
      case 3:
        btnGroup = (
          <div className={styles.btnGroup}>
            {item.seller !== userInfo.userId
            ?<Button type='danger' className={styles.concealCollect}  size='small'  onClick={()=>this.handleGoToRefound(orderInfo.orderId)}>退款</Button>
            :''
            }
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(orderInfo.orderId)}} >查看物流</Button>
            {/* <Button type='primary' className={styles.concealCollect}  size='small' onClick={()=>{this.comfirmGood(item.orderId)}}>确认收货</Button> */}
            <Button
              type='primary' className={styles.concealCollect} size='small'
              onClick={() =>
                alert('确认收货', '你确认收货？', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确认', onPress: () => this.comfirmGood(orderInfo.orderId) },
                ])
              }
            >
              确认收货
            </Button>


          </div>
        );
        break;
      //  订单已完成 显示删除订单按钮
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
        case 9:
          btnGroup = (
            <div className={styles.btnGroup}>
              { item.seller !== userInfo.userId
              ?<Button type='default' className={styles.concealCollect}  size='small' onClick={()=>this.handleGoToRefound(item.orderId)}>退款中</Button>
              :
              <Button
                type='primary'
                className={styles.concealCollect}
                size='small'
                onClick={() =>
                  alert('退款','确定同意退款吗', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => this.handleAcceptRefound(item.orderId,item) },
                  ])
                }
                >同意退款</Button>
              }
            </div>
          );
          break;
          // eslint-disable-next-line no-duplicate-case
          case 10:
            btnGroup = (
              <div className={styles.btnGroup}>
                <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>this.handleGoToRefound(item.orderId)}>退款成功</Button>
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
