/*
 * @Author: your name
 * @Date: 2021-01-11 15:42:40
 * @LastEditTime: 2021-02-04 16:38:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\AddressMange\index.js
 */
import React, { Component } from 'react'
import {Button} from 'antd-mobile'
import NavBar from './Components/NavBar'
import { connect } from 'dva';
import storage from '@/utils/storage'
import goTo from '../../utils/goTo'
import AddressList from './Components/AddressList'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    this.getAddressList();
  }
  getAddressList = () => {
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type: 'mine/getAddressList',
      payload: {
        userId: userInfo.userId
      }
    })
  }
  renderNavBarRightPart = () => {
    return (
      <span
        style={{border:'none'}}
        type={'default'}
        onClick={()=>{goTo('addAddress',this.props.history)}}>添加新地址</span>
    )
  }
  render() {
    const {addressList} = this.props;
    return (
      <div>
        <NavBar
          history={this.props.history}
          title={'我的收货地址'}
          renderRight={this.renderNavBarRightPart}
          ></NavBar>
        <AddressList addressList={addressList} history={this.props.history}></AddressList>
      </div>
    )
  }
}
const mapStateToProps = (state)=> ({
  addressList: state.mine.addressList
})
export default connect(mapStateToProps)(index);
