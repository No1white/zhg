/*
 * @Author: your name
 * @Date: 2021-01-20 21:15:18
 * @LastEditTime: 2021-04-29 22:17:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\Settings\Components\Autonym\index.js
 */
import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Button,WingBlank} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'dva'
import storage from '../../../../../../utils/storage'
import goTo from '../../../../../../utils/goTo'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
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
    const userInfo = storage.get('userInfo')||{};
    return (
      <div className={styles.userPageWrap}>
        <div className={styles.closeBtn} onClick={()=> {this.props.history.goBack(-1)}}>
          <span className={`iconfont icon-guanbi ${styles.close}`}></span>
        </div>
        <WingBlank>
            <div>
              <h2 className={styles.title}>如何获取支付宝Uid?</h2>
            </div>
            <span>
            电脑端查询路径：b.alipay.com--账号中心，
            左下角设置进入后-更多-查看PID/KEY,

            </span>
            <img className={styles.img} src="http://qs7bibypb.hn-bkt.clouddn.com/image/activity/uid.jpg" alt=""/>

        </WingBlank>

      </div>
    )
  }
}
const autonymWrap =  createForm()(index);
export default connect()(autonymWrap)
