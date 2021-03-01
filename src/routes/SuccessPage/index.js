/*
 * @Author: your name
 * @Date: 2021-01-25 19:01:14
 * @LastEditTime: 2021-02-19 19:14:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\SuccessPage\index.js
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import goTo from '@/utils/goTo'
import styles from './index.less'

const Item = List.Item;
class index extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.history);
    this.state = {
      hint: '获取验证码',
      codeFlag: false,
    }

  }

  render() {
    const { location } = this.props;
    const {query}  = location;
    const { msg} = query ||{ msg: '操作成功'};
    return (
      <div className={styles.userPageWrap}>
        <div className={styles.closeBtn} onClick={()=> {this.props.history.goBack(-1)}}>
          <span className={`iconfont icon-guanbi ${styles.close}`}></span>
        </div>
        <div className={styles.appTitle}>置换购</div>
        <div className={styles.formWrap}>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>{msg}</h2>

          </div>
          <Button className={styles.submitBtn}  onClick={()=>{goTo('/home',this.props.history)}}>返回首页</Button>
        </div>
      </div>
    )
  }
}
const Register = createForm()(index)
const mapStateToProps = state =>({

})

export default connect(mapStateToProps)(Register)
