import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
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
          <Button className={styles.submitBtn}>登陆</Button>
      </div>

    )
  }
  render() {
    return (
      <div className={styles.userPageWrap}>
        <div className={styles.closeBtn}>
          <span className={`iconfont icon-guanbi ${styles.close}`}></span>
        </div>
        <div className={styles.formWrap}>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>亲，欢迎登陆</h2>
            <p className={styles.label}>没有账户？
              <sapn className={styles.swtichBtn}>立即注册</sapn>
            </p>
          </div>
          {this.renderLogin()}
        </div>
      </div>
    )
  }
}
export default createForm()(index)
