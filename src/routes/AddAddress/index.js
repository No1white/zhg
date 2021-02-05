/*
 * @Author: your name
 * @Date: 2021-01-11 20:59:08
 * @LastEditTime: 2021-02-04 18:31:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\AddAddress\index.js
 */
import React, { Component } from 'react'
import NavBar from '../AddressMange/Components/NavBar'
import { connect } from 'dva';
import storage from '@/utils/storage'
import { createForm } from 'rc-form';
import {List,InputItem,Picker,TextareaItem,Switch,Button,Modal} from 'antd-mobile'
import styles from './index.less'



const alert = Modal.alert;
class index extends Component {
  constructor(props) {
    super(props);
    const { location:{query ={}} } = this.props;
    this.state = {
      checked: query.defaultAddress === 0  ? true :false,
      queryPamras: {

      }
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type:'mine/getLevelAddress'
    })
  }
  handleSaveAddress = ()=> {
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    const userInfo = storage.get('userInfo');
    const { location:{query ={}} } = this.props;
    if(query.userName) {
      this.props.dispatch({
        type: 'mine/alterAddress',
        payload: {
          ...values,
          defaultAddress: this.state.checked ? 0 : 1,
          userId: userInfo.userId,
          addressId: query.addressId
        },
        callback: ()=> {
          this.props.history.push('/addressMange')
        }
      })
    } else {
      this.props.dispatch({
        type: 'mine/saveAddressInfo',
        payload: {
          ...values,
          defaultAddress: this.state.checked ? 0 : 1,
          userId: userInfo.userId,
        },
        callback: ()=> {
          this.props.history.push('/addressMange')
        }
      })
    }

  }
  handleDelAddress = () => {

    const userInfo = storage.get('userInfo');
    const { location:{query ={}} } = this.props;
      this.props.dispatch({
        type: 'mine/delAddress',
        payload: {
          defaultAddress: this.state.checked ? 0 : 1,
          userId: userInfo.userId,
          addressId: query.addressId
        },
        callback: ()=> {
          this.props.history.push('/addressMange')
        }
      })
  }
  renderForm = ()=> {
    const { getFieldProps } = this.props.form;

    const { levelAddress,location:{query ={}} } = this.props;
    let { checked = query.userName ? true :false} = this.state;
    let provinceCode = '';
    let cityCode = '';
    let regionCode = '';
    levelAddress.forEach(item => {
      if(query.province == item.label) {
        provinceCode = item.value;
        item.children.forEach(cityItem => {
          if(query.city == cityItem.label) {
            cityCode = cityItem.value;
            cityItem.children && cityItem.children.forEach(regionItem => {
              if(query.region == regionItem.label) {
                regionCode = regionItem.value;
              }
            })
          }
        })
      }

    });
    return (
      <List className={styles.formWrap}>
        <InputItem
          {...getFieldProps('userName',{
            initialValue: query.userName
          })}
          placeholder="请输入姓名"
          className={`${styles.inputItem}`}
        >收货人</InputItem>
        <InputItem
          {...getFieldProps('phone',{
            initialValue: query.phone
          })}
          placeholder="请输入手机号"
          className={`${styles.inputItem}`}
        >手机号码</InputItem>
        <Picker extra="请选择"
          data={levelAddress}
          title="选择地区"
          className={`${styles.inputItem}`}
          {...getFieldProps('region', {
            initialValue: [provinceCode,cityCode,regionCode]
          })}
          onOk={e => console.log('ok', e)}
          onDismiss={e => console.log('dismiss', e)}
        >
          <List.Item arrow="horizontal">所在地区</List.Item>
        </Picker>
        <TextareaItem
            title="详细地址"
            {...getFieldProps('addressDetail',{
            initialValue: query.addressDetail
          })}
            className={`${styles.inputItem}`}
            placeholder="请输入详细地址"
            data-seed="logId"
            autoHeight
            ref={el => this.customFocusInst = el}
          />
        <List.Item
          className={`${styles.inputItem}`}
          extra={<Switch
            checked={checked}
            onChange={() => {
              this.setState({
                checked: !this.state.checked,
              });
            }}
          />}
        >默认地址</List.Item>
        {query.userName ? <span className={`${styles.delAddress} themeColor`} onClick={() =>
        alert('Delete', '确定删除?', [
          { text: '取消', onPress: () => {} },
          { text: '确定', onPress: () => this.handleDelAddress() },
        ])
      }>删除地址</span> :''}

    </List>

    )
  }

  render() {
    return (
      <div className={styles.addAddressWrap}>
        <NavBar title={'添加收获地址'} history={this.props.history}></NavBar>
        {this.renderForm()}
        <Button className={`${styles.btn} bgLinear`} size="largar" onClick={this.handleSaveAddress}>保存</Button>
      </div>
    )
  }
}
const indexWrap = createForm()(index)
const mapStateToProps =  (state) => ({
  levelAddress: state.mine.levelAddress
})
export default connect(mapStateToProps)(indexWrap)
