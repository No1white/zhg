/*
 * @Author: your name
 * @Date: 2021-01-25 19:01:14
 * @LastEditTime: 2021-02-23 16:52:46
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
  componentDidMount(){
    const { location } = this.props;
    const {query,search}  = location;
    let paramList =search.split('&');
    let out_trade_no= paramList[1].split('=')[1];
    this.props.dispatch({
      type: 'clearing/success',
      payload: {
        out_trade_no
      }
    })
  }
  render() {
    const { location } = this.props;
    const {query,search}  = location;
    let paramList =search.split('&');
    let out_trade_no= paramList[1].split('=')[1];
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
const indexWrap = createForm()(index)
const mapStateToProps = state =>({

})

export default connect(mapStateToProps)(indexWrap)
