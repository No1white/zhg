/*
 * @Author: your name
 * @Date: 2021-01-11 20:59:08
 * @LastEditTime: 2021-05-21 17:09:38
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
    const addressList  = storage.get('addressList');
    console.log(addressList);
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
      let defaultAddress = 0;
      console.log(addressList);
      if(!addressList) {
        defaultAddress = 0;
      }else {
        defaultAddress = this.state.checked ? 0 : 1;
      }
      this.props.dispatch({
        type: 'mine/saveAddressInfo',
        payload: {
          ...values,
          defaultAddress: defaultAddress,
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
          placeholder="???????????????"
          className={`${styles.inputItem}`}
        >?????????</InputItem>
        <InputItem
          {...getFieldProps('phone',{
            initialValue: query.phone
          })}
          placeholder="??????????????????"
          className={`${styles.inputItem}`}
        >????????????</InputItem>
        <Picker extra="?????????"
          data={levelAddress}
          title="????????????"
          className={`${styles.inputItem}`}
          {...getFieldProps('region', {
            initialValue: [provinceCode,cityCode,regionCode]
          })}
          onOk={e => console.log('ok', e)}
          onDismiss={e => console.log('dismiss', e)}
        >
          <List.Item arrow="horizontal">????????????</List.Item>
        </Picker>
        <TextareaItem
            title="????????????"
            {...getFieldProps('addressDetail',{
            initialValue: query.addressDetail
          })}
            className={`${styles.inputItem}`}
            placeholder="?????????????????????"
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
        >????????????</List.Item>
        {query.userName ? <span className={`${styles.delAddress} themeColor`} onClick={() =>
        alert('Delete', '?????????????', [
          { text: '??????', onPress: () => {} },
          { text: '??????', onPress: () => this.handleDelAddress() },
        ])
      }>????????????</span> :''}

    </List>

    )
  }

  render() {
    return (
      <div className={styles.addAddressWrap}>
        <NavBar title={'??????????????????'} history={this.props.history}></NavBar>
        {this.renderForm()}
        <Button className={`${styles.btn} bgLinear`} size="largar" onClick={this.handleSaveAddress}>??????</Button>
      </div>
    )
  }
}
const indexWrap = createForm()(index)
const mapStateToProps =  (state) => ({
  levelAddress: state.mine.levelAddress
})
export default connect(mapStateToProps)(indexWrap)
