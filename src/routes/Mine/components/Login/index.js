import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'dva'
import goTo from '../../../../utils/goTo'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.history);
    this.state= {
      msg: ''
    }
  }

  validValue = ()=>{
    let reg = '';
    let flag= 0;
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    Object.keys(values).forEach(item =>{
      // eslint-disable-next-line default-case
      switch(item) {
        case 'phone':
          reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
          if(!reg.test(values[item])) {
            this.setState({
              msg: '输入手机号格式错误'
            });

          }else {
            flag++;

          }
          break;
        case 'password':
          reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
          if(!reg.test(values[item])) {
            this.setState({
              msg: '密码必须大于7位并且包含一位大小写字母及数字'
            })

          }else {
            flag++;

          }
          break;
      }
    });
    if(flag ===2) {
      this.login();
    }else {
      return ;
    }
  }
  login = ()=> {
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    this.props.dispatch({
      type: 'mine/login',
      payload: {
        ...values,
      },
      callback: (res)=> {
          goTo('/mine',this.props.history)
      },
    })
  }
  renderLogin = () =>{
    const { getFieldProps } = this.props.form;
    const { msg = ''} = this.state;
    return (
      <div className={styles.operateWrap}>
          <List className={styles.form} >
            <InputItem
              {...getFieldProps('phone')}
              placeholder="请输入手机号"
              className={'userName'}
            >
              <span className={'iconfont icon-shouji'} />
            </InputItem>
            <InputItem
              {...getFieldProps('password')}
              type="password"
              placeholder="请输入密码"
              className={'userName'}
            >
              <span className={'iconfont icon-iconfont17'} />
            </InputItem>
            <p className={styles.info}>{msg}</p>

        </List>
          <Button className={styles.submitBtn} onClick={this.validValue}>登陆</Button>

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
            <h2 className={styles.title}>亲，欢迎登陆</h2>
            <p className={styles.label}>没有账户？
              <sapn className={styles.swtichBtn} onClick={()=>{goTo('register',this.props.history)}}>立即注册</sapn>
            </p>
          </div>
          {this.renderLogin()}
        </div>
      </div>
    )
  }
}
const loginWrap =  createForm()(index);
export default connect()(loginWrap)
