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
  renderSaledList = () => {
    return (
      <div className={styles.saledList}>
        <div className={styles.saledItem}>
          <div className={styles.goodInfo}>

            <img className={styles.goodImg} src={'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1587601794,489963968&fm=11&gp=0.jpg'}></img>
            <div className={styles.goodDetail}>
              <h3 className={styles.goodTitle}>Dior迪奥粉底foreve</h3>
              <span className={`${styles.price} themeColor`}>￥300</span>
              <div className={styles.msgLine}>
                <span className={styles.msgItem}>留言0</span>
                <span className={styles.msgItem}>留言0</span>
                <span className={styles.msgItem}>留言0</span>
              </div>
            </div>

          </div>

          {/* <div className={styles.btnWrap}>
            <Button type='default' className={styles.concealCollect}  size='small'>编辑</Button>
            <Button type='warning' className={styles.concealCollect}  size='small'>编辑</Button>
          </div> */}
        </div>
        <div className={styles.saledItem}>
          <div className={styles.goodInfo}>

            <img className={styles.goodImg} src={'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1587601794,489963968&fm=11&gp=0.jpg'}></img>
            <div className={styles.goodDetail}>
              <h3 className={styles.goodTitle}>Dior迪奥粉底foreve</h3>
              <span className={`${styles.price} themeColor`}>￥300</span>
              <div className={styles.msgLine}>
                <span className={styles.msgItem}>留言0</span>
                <span className={styles.msgItem}>留言0</span>
                <span className={styles.msgItem}>留言0</span>
              </div>
            </div>

          </div>

          {/* <div className={styles.btnWrap}>
            <Button type='default' className={styles.concealCollect}  size='small'>编辑</Button>
            <Button type='warning' className={styles.concealCollect}  size='small'>编辑</Button>
          </div> */}
        </div>
      </div>
    )
  }
  render() {
    return (

        <div className={styles.saledWrap}>
          <NavBar history={this.props.history} title={'已卖出'}></NavBar>
          {this.renderSaledList()}
        </div>

    )
  }
}
export default index
