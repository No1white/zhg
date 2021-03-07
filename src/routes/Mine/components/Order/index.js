/*
 * @Author: your name
 * @Date: 2021-01-17 11:20:57
 * @LastEditTime: 2021-03-02 20:15:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\Order\index.js
 */
import React, { Component } from 'react'
import {WingBlank,Button, Modal,Toast,Steps} from 'antd-mobile'
import createForm from 'rc-form'
import {connect} from 'dva';
import storage from '@/utils/storage';
import goTo from '@/utils/goTo';
import BtnGroup from '../BtnGroup'
import NavBar from '../NavBar'
import TabBar from '../../../Home/components/TabBar'
import styles from './index.less'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';


const alert = Modal.alert;
const prompt = Modal.prompt;
const Step = Steps.Step;
// 订单
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      filterOrder: 0,
    }
  }
  componentDidMount() {
    const userInfo = storage.get('userInfo');
    this.getOrderList(userInfo.userId);
  }
  // 填写物流单号
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
  handleTabClick = (data) =>{
    this.setState({
      filterOrder:data.type
    })
  }
  handleGoToDetail = (orderId)=> {
    this.props.history.push(`/orderDetail/${orderId}`)
  }
  handleGoToRefound = (orderId) => {
    this.props.history.push(`/refoundGood/${orderId}`)
  }
  handleAcceptExchange = (orderId) => {
        // this.forceUpdate();
    const userInfo = storage.get('userInfo');

    this.props.dispatch({
      type: 'mine/acceprtExChange',
      payload :{
        orderId: orderId,
      },
      callback: res=> {
        this.getOrderList(userInfo.userId);
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
  goToPay = (orderId,item) => {
    this.props.dispatch({
      type: 'clearing/goToPay',
      payload:{
        orderId,
        goodTitle: item.title
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
    if(userInfo.userId === item.seller) {
      fillLogFlag = 1;
    }else {
      fillLogFlag = 2;
    }
    this.showModal('modal1');
    this.props.dispatch({
      type: 'mine/getLogisticsInfo',
      payload:{
        orderId,
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
  renderTabBar = () => {
    const tabs = [
      {
        title: '全部',
        type: '0',
      },
      { title: '待发货',
        type: '1',
      },
      { title: '待收货',
        type: '2',
      },
      { title: '评价',
        type: '3',
      }

    ];
    return (
      <div className={styles.tabBarWrap}>
        <TabBar  tabs={tabs} handleTabClick={this.handleTabClick} renderContent={this.renderOrderList}  />
      </div>
    )

  }
  // 渲染订单操作栏
  renderBtnGroup = (state,item)=> {
    const userInfo = storage.get('userInfo');
    const fillLogisticsFlag = item.swap===0 ? true : false;
    let btnGroup = '';
    switch(state) {
      // 0 未支付  显示支付按钮
      case 0:
          btnGroup = (
            <div className={styles.btnGroup}>
              <Button type='warning' className={styles.concealCollect}  size='small' onClick={()=>this.goToPay(item.orderId)}>去支付</Button>
            </div>
          )
          break;
      // 已支付 退款 卖家显示 填写物流
      case 1:

        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>this.handleGoToRefound(item.orderId)}>退款</Button>

            {/* 判断如果是置换 买家也要填写物流 */}
            {
              item.buyer === userInfo.userId && item.swap === 0 && item.logisticsState != 2
              ?<Button  type='default' className={styles.concealCollect}  size='small'
                    onClick={() => prompt('填写物流单号', '物流单号', [
                    { text: '取消' },
                    { text: '确定', onPress: value => this.handleFillLogistics(value,item.orderId,item)},
                  ], 'default', null,['快递单号'])}
                  >填写物流</Button>
            : ''
            }

            {item.seller === userInfo.userId && item.logisticsState != 1
            ?   <Button  type='default' className={styles.concealCollect}  size='small'
                    onClick={() => prompt('填写物流单号', '物流单号', [
                    { text: '取消' },
                    { text: '确定', onPress: value => this.handleFillLogistics(value,item.orderId,item)},
                  ], 'default', null,['快递单号'])}
                  >填写物流</Button>
            : ''}
            {
              item.seller === userInfo.userId && item.logisticsState === 1 ?
              <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(item.orderId)}} >查看物流</Button>
              : ''
            }
            {
              item.buyer === userInfo.userId && item.logisticsState === 2 ?
              <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(item.orderId)}} >查看物流</Button>
              : ''
            }

          </div>
        );
        break;
      case 2:
        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>this.handleGoToRefound(item.orderId)}>退款</Button>
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(item.orderId,item)}} >查看物流</Button>

          </div>
        )
        break;
      case 3:
        btnGroup = (
          <div className={styles.btnGroup}>
            <Button type='danger' className={styles.concealCollect}  size='small'  onClick={this.handleGoToRefound}>退款</Button>
            <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>{this.showLogisticsInfo(item.orderId)}} >查看物流</Button>
            {/* <Button type='primary' className={styles.concealCollect}  size='small' onClick={()=>{this.comfirmGood(item.orderId)}}>确认收货</Button> */}
            <Button
              type='primary' className={styles.concealCollect} size='small'
              onClick={() =>
                alert('确认收货', '你确认收货？', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确认', onPress: () => this.comfirmGood(item.orderId) },
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
      default:

        btnGroup = '';

    }
    return btnGroup;
  }
  renderOrderList = (tab) => {
    const {orderList =[]} = this.props;
    const {filterOrder} = this.state;
    return (
      <div className={styles.orderList}>
        {orderList.map(item => {
          console.log(item.state)
          console.log(item.state === filterOrder)
          if(filterOrder == 0) {

            return (
            <div className={styles.orderItem}>
              <div className={styles.goodInfo} onClick={()=>{this.handleGoToDetail(item.orderId)}}>
                <img className={styles.goodImg} src={item.imgUrl}></img>
                <div className={styles.goodDetail}>
                  <h3 className={styles.goodTitle}>{item.title}</h3>

                  <span className={`${styles.price} themeColor`}>￥{item.price}</span>
                </div>
              </div>
              {
                item.swap === 0 &&  <p className={`${styles.swap} themeColor`}>置换</p>
              }
              {
                item.swap === 0 &&
                <div className={styles.exchangeGoodInfo} onClick={()=>{this.handleGoToDetail(item.exchangeGoodInfo.goodId)}}>
                  <img className={styles.goodImg} src={item.exchangeGoodInfo.imgUrl}></img>
                  <div className={styles.goodDetail}>
                    <h3 className={styles.goodTitle}>{item.exchangeGoodInfo.title}</h3>
                    <span className={`${styles.price} themeColor`}>￥{item.exchangeGoodInfo.price}</span>
                  </div>
                </div>
              }



              <div className={styles.footerWrap}>
                {/* <div className={styles.priceWrap}>
                  实付款：<span className={`${styles.price} themeColor`}>￥5.o</span>
                </div> */}
                <div className={styles.contact}>
                  {/* <sapn className={`iconfont icon-pinglun1`}></sapn>
                  联系卖家 */}
                </div>
                {
                  this.renderBtnGroup(item.state,item)
                }
                {/* <div className={styles.btnGroup}>
                <Button type='default' className={styles.concealCollect}  size='small'>查看物流</Button>
                <Button type='warning' className={styles.concealCollect}  size='small'>确认收货</Button>
                <Button type='warning' className={styles.concealCollect}  size='small'>评价</Button>
                </div> */}
              </div>
            </div> )
          } else if(item.state == filterOrder) {
            return (
            <div className={styles.orderItem}>
              <div className={styles.goodInfo} onClick={()=>{this.handleGoToDetail(item.orderId)}}>
                <img className={styles.goodImg} src={item.imgUrl}></img>
                <div className={styles.goodDetail}>
                  <h3 className={styles.goodTitle}>{item.title}</h3>

                  <span className={`${styles.price} themeColor`}>￥{item.price}</span>
                </div>
              </div>
              {
                item.swap === 0 &&  <p className={`${styles.swap} themeColor`}>置换</p>
              }
              {
                item.swap === 0 &&
                <div className={styles.exchangeGoodInfo} onClick={()=>{this.handleGoToDetail(item.exchangeGoodInfo.goodId)}}>
                  <img className={styles.goodImg} src={item.exchangeGoodInfo.imgUrl}></img>
                  <div className={styles.goodDetail}>
                    <h3 className={styles.goodTitle}>{item.exchangeGoodInfo.title}</h3>
                    <span className={`${styles.price} themeColor`}>￥{item.exchangeGoodInfo.price}</span>
                  </div>
                </div>
              }



              <div className={styles.footerWrap}>
                {/* <div className={styles.priceWrap}>
                  实付款：<span className={`${styles.price} themeColor`}>￥5.o</span>
                </div> */}
                <div className={styles.contact}>
                  {/* <sapn className={`iconfont icon-pinglun1`}></sapn>
                  联系卖家 */}
                </div>
                {
                  this.renderBtnGroup(item.state,item)
                }
                {/* <div className={styles.btnGroup}>
                <Button type='default' className={styles.concealCollect}  size='small'>查看物流</Button>
                <Button type='warning' className={styles.concealCollect}  size='small'>确认收货</Button>
                <Button type='warning' className={styles.concealCollect}  size='small'>评价</Button>
                </div> */}
              </div>
            </div>)
          } else {
            return ('')
          }

        })}

      </div>
    )
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
  render() {
    return (

        <div className={styles.orderWrap}>
          <NavBar history={this.props.history} title={'我的订单'}></NavBar>
          {this.renderTabBar()}
          {/* {this.renderOrderList()} */}
          {this.renderModal()}
        </div>

    )
  }
}
const mapStateToProps = (state) => ({
  orderList: state.mine.orderList,
  logisticsInfo: state.mine.logisticsInfo,
})
export default connect(mapStateToProps)(index)
