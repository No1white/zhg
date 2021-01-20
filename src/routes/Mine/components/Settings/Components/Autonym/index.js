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
    console.log(userInfo);
    const values = getFieldsValue();
    this.props.dispatch({
      type: 'mine/autonym',
      payload: {
        ...values,
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
        </List>
          <Button className={styles.submitBtn} onClick={this.autonym}>认证</Button>
      </div>

    )
  }
  render() {
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
          {this.renderautonym()}
        </div>
      </div>
    )
  }
}
const autonymWrap =  createForm()(index);
export default connect()(autonymWrap)
