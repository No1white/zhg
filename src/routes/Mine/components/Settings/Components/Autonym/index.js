/*
 * @Author: your name
 * @Date: 2021-01-20 21:15:18
 * @LastEditTime: 2021-03-22 12:33:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\Settings\Components\Autonym\index.js
 */
import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'dva'
import storage from '../../../../../../utils/storage'
import goTo from '../../../../../../utils/goTo'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.history);
  }
  autonym = ()=> {
    const { getFieldsValue } = this.props.form;
    const userInfo = storage.get('userInfo');
    const values = getFieldsValue();
    this.props.dispatch({
      type: 'mine/autonym',
      payload: {
        ...values,
        userId:userInfo.userId
      },
      callback: (res)=> {
          goTo('/mine',this.props.history)
      },
    })
  }
  renderautonym = () =>{
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.operateWrap}>
          <List className={styles.form} >
            <InputItem
              {...getFieldProps('realName')}
              placeholder="请输入姓名"
              className={'userName'}
            >
              <span className={'iconfont icon-wode'} />
            </InputItem>
            <InputItem
              {...getFieldProps('cardNo')}
              placeholder="请输入身份证号"
              className={'userName'}
            >
              <span className={'iconfont icon-iconfontwo'} />
            </InputItem>
            <InputItem
              {...getFieldProps('aliPayId')}
              placeholder="请输入支付宝Uid"
              className={'userName'}
            >
              <span className={'iconfont icon-zhifu-01'} />
            </InputItem>
            <div className={styles.info}>
              <p className={styles.textMsg}>例如:2088621955303871</p>
              <p className={styles.textMsg}>UID极为重要,用于收付款</p>
              <p className={styles.textMsg}>后续可在个人中心设置</p>
            </div>
        </List>
          <Button className={styles.submitBtn} onClick={this.autonym}>认证</Button>
      </div>

    )
  }
  renderautonymInfo = () =>{
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.operateWrap}>
          <p className={styles.autonym} style={{
            fontSize: '20px',
            color: '#ff4f18',
            textAlign: 'center'
          }}>实名验证已通过</p>
      </div>

    )
  }
  render() {
    const userInfo = storage.get('userInfo');
    console.log(userInfo);
    return (
      <div className={styles.userPageWrap}>
        <div className={styles.closeBtn} onClick={()=> {this.props.history.goBack(-1)}}>
          <span className={`iconfont icon-guanbi ${styles.close}`}></span>
        </div>
        <div className={styles.appTitle}>实名认证</div>
        <div className={styles.formWrap}>
          <div className={styles.titleWrap}>
            {/* <h2 className={styles.title}>实名认证</h2> */}

          </div>
          {userInfo.autonym === 1 ? this.renderautonym() : this.renderautonymInfo()}
        </div>
      </div>
    )
  }
}
const autonymWrap =  createForm()(index);
export default connect()(autonymWrap)
