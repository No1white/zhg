import React, { Component } from 'react'
import { connect } from 'dva'
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import goTo from '../../../../utils/goTo'
import styles from './index.less'

const Item = List.Item;
class index extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.history);
  }
  sendVerifyCode = (phone) => {
    this.props.dispatch({
      type: 'mine/sendVerifyCode',
      payload: {
        phone
      },
    })
    console.log('1');
  }
  // 处理点击事件
  handleGetCode = ()=> {
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    console.log(values);
    this.sendVerifyCode(values.phone)
  }
  regiter = () => {
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue();
  }
  renderLogin = () =>{
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.operateWrap}>
          <List className={styles.form} >
            <InputItem
              {...getFieldProps('phone')}
              placeholder="请输入手机号"
              className={'userName'}
            >
              <span className={`iconfont icon-shouji ${styles.inputIcon}`} />
            </InputItem>
            <div className={styles.verifyCodeInput}>
              <span className={'iconfont icon-iconfont17'} />
              <InputItem
                {...getFieldProps('verifyCode')}
                className={styles.verifyInput}
                placeholder="请输入验证码"
              />
              <span className={`${styles.btnVerify} themeColor`} onClick={this.handleGetCode}>获取验证码</span>
            </div>
            <InputItem
              {...getFieldProps('password')}
              type="password"
              placeholder="请输入密码"
              className={'userName'}
            >
              <span className={'iconfont icon-iconfont17'} />
            </InputItem>
        </List>
          <Button className={styles.submitBtn} onClick={this.regiter}>注册</Button>
      </div>

    )
  }
  render() {
    return (
      <div className={styles.userPageWrap}>
        <div className={styles.closeBtn} onClick={()=> {this.props.history.goBack(-1)}}>
          <span className={`iconfont icon-guanbi ${styles.close}`}></span>
        </div>
        <div className={styles.appTitle}>置换购</div>
        <div className={styles.formWrap}>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>亲，欢迎注册</h2>
            <p className={styles.label}>已有账号，
              <sapn className={styles.swtichBtn} onClick={()=>{goTo('login',this.props.history)}}>去登录</sapn>
            </p>
          </div>
          {this.renderLogin()}
        </div>
      </div>
    )
  }
}
const Register = createForm()(index)
const mapStateToProps = state =>({

})

export default connect(mapStateToProps)(Register)
