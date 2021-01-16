import React, { Component } from 'react'
import NavBar from '../AddressMange/Components/NavBar'
import {List,InputItem,Picker,TextareaItem,Switch,Button} from 'antd-mobile'
import styles from './index.less'
const data = [
  {
    label:'11',
    value: '22'
  }
]
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  renderForm = ()=> {
    return (
      <List className={styles.formWrap}>
        <InputItem
          // {...getFieldProps('input3')}
          placeholder="请输入生活"
          className={`${styles.inputItem}`}
        >收货人</InputItem>
        <InputItem
          // {...getFieldProps('input3')}
          placeholder="请输入手机号"
          className={`${styles.inputItem}`}
        >手机号码</InputItem>
        <Picker extra="请选择(可选)"
          data={data}
          title="Areas"
          className={`${styles.inputItem}`}
          // {...getFieldProps('district', {
          //   initialValue: ['340000', '341500', '341502'],
          // })}
          onOk={e => console.log('ok', e)}
          onDismiss={e => console.log('dismiss', e)}
        >
          <List.Item arrow="horizontal">所在地区</List.Item>
        </Picker>
        <TextareaItem
            title="详细地址"
            className={`${styles.inputItem}`}
            placeholder="请输入详细地址"
            data-seed="logId"
            autoHeight
            ref={el => this.customFocusInst = el}
          />
        <List.Item
          className={`${styles.inputItem}`}
          extra={<Switch
            checked={this.state.checked}
            onChange={() => {
              this.setState({
                checked: !this.state.checked,
              });
            }}
          />}
        >默认地址</List.Item>
        <span className={`${styles.delAddress} themeColor`}>删除地址</span>

    </List>

    )
  }
  render() {
    return (
      <div className={styles.addAddressWrap}>
        <NavBar title={'添加收获地址'} history={this.props.history}></NavBar>
        {this.renderForm()}
        <Button className={`${styles.btn} bgLinear`} size="largar" >保存</Button>
      </div>
    )
  }
}
export default index
