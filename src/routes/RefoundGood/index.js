import React, { Component } from 'react'
import NavBar from './components/NavBar'
import {Checkbox,WingBlank,Switch,List,ActionSheet,Toast, WhiteSpace,Picker, Button} from 'antd-mobile'
import { connect } from 'dva';
import { createForm } from 'rc-form';
import ExchangeCommodity from './components/exchangeCommodity'
import goTo from '../../utils/goTo'
import storage from '@/utils/storage'
import CommodityList from './components/CommodityList'
import styles from './index.less'
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;


class index extends Component {
  constructor(props) {
    const {location:{query =[]},userGoodList} = props;
    const  {goodList = []} = query;
    super(props);
    this.state = {
      sValue: '',
    }

  }


  componentDidMount() {
    const {match:{params}} = this.props;
    const { orderId = ''} = params;
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type: 'mine/getOrderDetail',
      payload: {
        orderId:orderId,
      }
    });


  }


  reFound = () => {
    const {match:{params:{orderId}},goodInfo} = this.props;
    const { sValue} = this.state;

    console.log(this.props);
    this.props.dispatch({
      type: 'mine/reFound',
      payload: {
        orderId,
        price: goodInfo.price,
        reason: sValue[0],
      },
      callback: res=> {
        window.location.reload();
      }
    })
  }

  render() {
    // const {goodList = []} = this.state;
    const {goodInfo ={},orderInfo ={}} = this.props;
    const {remark,checked}  =this.state;

    const reFoundValue = [
      {
        label: '不想要了多拍了',
        value: '0',
      },
      {
        label: '商品信息错了',
        value: '1',
      },
      {
        label: '质量问题',
        value: '2',
      },
    ]
    console.log(goodInfo);
    return (
      <div className={styles.clearingWrap}>
        <List>
          <NavBar history={this.props.history} title='退款' ></NavBar>
          {/* {this.renderAddress()} */}
          {/* {this.renderSwitch()} */}
          <CommodityList
          goodList={ [{...goodInfo}]}
          changeTotalPrice={this.changeTotalPrice}
          remark={remark}
          onRemarkChange={this.onRemarkChange}></CommodityList>

          {
            orderInfo.state !== 9
            ?
            <WingBlank>
            <div className={styles.service}>
                {/* <h3 className={styles.tile}>
                  选择退款原因
                </h3> */}
                <Picker
                  data={reFoundValue}
                  title="选择原因"
                  // cascade={false}
                  cols={1}
                  extra="请选择(可选)"
                  value={this.state.sValue}
                  onChange={v => this.setState({ sValue: v })}
                  onOk={v => this.setState({ sValue: v })}
                >
                  <List.Item arrow="horizontal">退款原因</List.Item>
                </Picker>
                <div className={`${styles.acount} `}>退款金额:<span className={`themeColor`}>￥{goodInfo.price}</span></div>
            </div>
            <Button type='danger' className={styles.confirmBtn} onClick={this.reFound}>确认退款</Button>

          </WingBlank>
            :
            <WingBlank>
              <div className={styles.resultWrap}>
                <h3 className={styles.title}>退款，等待商家处理。。。。。</h3>
              </div>
            </WingBlank>
          }

        </List>
      </div>
    )
  }
}
const indexWrap = createForm()(index)
const mapStateToProps = (state)=> ({
  goodInfo: state.mine.goodInfo,
  orderInfo: state.mine.orderInfo,
  addressInfo: state.mine.addressInfo,
})
export default connect(mapStateToProps)(indexWrap)
