import React, { Component } from 'react'
import {Button} from 'antd-mobile'
import NavBar from './Components/NavBar'
import goTo from '../../utils/goTo'
import AddressList from './Components/AddressList'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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
    return (
      <div>
        <NavBar
          history={this.props.history}
          title={'我的收货地址'}
          renderRight={this.renderNavBarRightPart}
          ></NavBar>
        <AddressList></AddressList>
      </div>
    )
  }
}
export default index
