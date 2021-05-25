/*
 * @Author: your name
 * @Date: 2021-01-13 19:43:28
 * @LastEditTime: 2021-04-29 22:17:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\Settings\Components\AlterUserInfo\index.js
 */
import React, { Component } from 'react'
import {connect} from 'dva'
import {createForm} from 'rc-form'
import {List,InputItem,ImagePicker, WingBlank, SegmentedControl,Toast} from 'antd-mobile'
import NavBar from '../../../../../AddressMange/Components/NavBar'
import styles from './index.less'
import storage from '../../../../../../utils/storage'


const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}];

class index extends Component {
  constructor(props) {
    super(props);
    const userInfo = storage.get('userInfo');
    this.state = {
      files: [{
        url: userInfo.avatar,
        id: 1,
      }],
      multiple: false,
    }
  }

  onChange = (files, type, index) => {
    const newFiles = [files[1]];
    // newFiles.push(files[])
    this.setState({
      // files:newFiles,
      // files
      files: newFiles
    });
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  }
  handleChangeUserInfo = () => {
    const {getFieldsValue} = this.props.form;
    const values =getFieldsValue();
    const {files} = this.state;
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type: 'mine/changeUserInfo',
      payload: {
        ...values,
        avatar: files[0],
        userId: userInfo.userId,
      },
      callback: res=>{
        window.location.reload();
        userInfo.nickName = res.userInfo.nickName;
        userInfo.avatar = res.userInfo.avatar,
        storage.set('userInfo',userInfo);
        Toast.info(res.msg);
      }
    })
  }

  renderUserInfo = () => {
    const userInfo = storage.get('userInfo');
    const { files } = this.state;

    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.userInfoWrap}>
        <div className={styles.userInfo}>
          {/* <img  src={userInfo.avatar}></img> */}
          <WingBlank className={styles.avatar}>
            <ImagePicker
              files={files}
              className={styles.picker}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 7}
              multiple={this.state.multiple}
            />
          </WingBlank>
            <List  className={styles.userInfoList}>
          {/* <InputItem
            className={styles.userInfoItem}
            // {...getFieldProps('autofocus')}
            clear
            placeholder="auto focus"
            ref={el => this.autoFocusInst = el}
          >账号</InputItem> */}
          <InputItem
            className={styles.userInfoItem}
            {...getFieldProps('nickName')}
            clear
            placeholder="请输入要修改的昵称"
            ref={el => this.inputRef = el}
          >昵称</InputItem>
          <List.Item>
            <div
              style={{ width: '100%', color: '#ff6b28', textAlign: 'center' }}
              onClick={()=>{this.handleChangeUserInfo()}}
            >
              修改
            </div>
          </List.Item>
        </List>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.alterUserInfoWrap}>
        <NavBar title={'个人信息'} history={this.props.history}></NavBar>
        {this.renderUserInfo()}
      </div>
    )
  }
}
const indexWrap = createForm()(index)
export default  connect()(indexWrap);
