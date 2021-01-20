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
        </List>
          <Button className={styles.submitBtn} onClick={this.login}>登陆</Button>
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
