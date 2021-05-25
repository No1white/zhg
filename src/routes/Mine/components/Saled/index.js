/*
 * @Author: your name
 * @Date: 2021-01-16 21:27:06
 * @LastEditTime: 2021-05-21 13:30:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\Saled\index.js
 */
import React, { Component } from 'react'
import {WingBlank,Button} from 'antd-mobile'
import { connect } from 'dva';
import NavBar from '../../../AddressMange/Components/NavBar'
import storage from '@/utils/storage';
import styles from './index.less'

// 收藏夹
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type: 'mine/getSaledGood',
      payload: {
        userId: userInfo.userId,
      }
    })
  }
  goToDetail = (goodId) => {
    this.props.history.push(`/commodityDetail/${goodId}`)
  }
  renderSaledList = () => {
    const { saledGoodList=[] } = this.props;
    return (
      <div className={styles.saledList}>
        {
          saledGoodList.map(item => {
            return (
              <div className={styles.saledItem} onClick={()=>this.goToDetail(item.goodId)} key={item.goodId}>
                <div className={styles.goodInfo}>

                  <img className={styles.goodImg} src={item.imgList[0]}></img>
                  <div className={styles.goodDetail}>
                    <h3 className={styles.goodTitle}>{item.title}</h3>
                    <span className={`${styles.price} themeColor`}>￥{item.price}</span>
                    <div className={styles.msgLine}>
                      <span className={styles.msgItem}>收藏{item.collect}</span>
                      <span className={styles.msgItem}>浏览{item.brose}</span>
                      {/* <span className={styles.msgItem}>留言0</span> */}
                    </div>
                  </div>

                </div>

                {/* <div className={styles.btnWrap}>
                  <Button type='default' className={styles.concealCollect}  size='small'>编辑</Button>
                  <Button type='warning' className={styles.concealCollect}  size='small'>编辑</Button>
                </div> */}
              </div>
            )
          })
        }


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
const mapStateToProps = (state) =>({
  saledGoodList: state.mine.saledGoodList,
})
export default connect(mapStateToProps)(index)
