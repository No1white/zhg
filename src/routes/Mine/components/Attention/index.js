import React, { Component } from 'react'
import {WingBlank,Button} from 'antd-mobile'
import NavBar from '../../../AddressMange/Components/NavBar'
import styles from './index.less'

// 收藏夹
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  renderAttentionList = () => {
    return (
      <div className={styles.attentionList}>
        <div className={styles.attentionItem}>
          <div className={styles.userInfo}>
            <img className={styles.avatar} src={'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1587601794,489963968&fm=11&gp=0.jpg'}></img>
            <sapn className={styles.userName}>昵称123123123</sapn>
            <Button type={'default'} className={`${styles.concealAttention} themeColor`}  size='small' >取消收藏</Button>
            {/* <span className={`${styles.price} themeColor`}>￥700</span> */}
          </div>

        </div>

      </div>
    )
  }
  render() {
    return (

        <div className={styles.attentionWrap}>
          <NavBar history={this.props.history} title={'关注的人'}></NavBar>
          {this.renderAttentionList()}
        </div>

    )
  }
}
export default index
