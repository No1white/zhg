/*
 * @Author: your name
 * @Date: 2021-01-16 20:57:17
 * @LastEditTime: 2021-04-29 22:17:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Mine\components\Publish\index.js
 */
import React, { Component } from 'react'
import {WingBlank,Button} from 'antd-mobile'
import { connect } from 'dva';
import storage from '@/utils/storage'
import NavBar from '../../../AddressMange/Components/NavBar'
import styles from './index.less'

// 收藏夹
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type: 'mine/getSoldList',
      payload: {
        userId: userInfo.userId,
      }
    });

  }
  goToDetail = (goodId) => {
    this.props.history.push(`/commodityDetail/${goodId}`)
  }
  goToEdit = (goodInfo) => {
    this.props.history.push({
      pathname: '/sale',
      query: {
        goodInfo
      }
    })
  }
  saleOut = (goodInfo)=>{
    this.props.dispatch({
      type:'sale/saleOut',
      payload:{
        goodId:goodInfo.goodId,
      }
    })
  }
  renderSoldOut = () => {
    const { publishGoodList = [],BASE_URL } = this.props;
    return (
      <div className={styles.publishList}>
        {publishGoodList.map(item =>{
          return (
            <div className={styles.publishItem} key={item.goodId} >
              <div className={styles.goodInfo} onClick={()=>{this.goToDetail(item.goodId)}}>
                <img className={styles.goodImg} src={item.imgList[0]}></img>
                <div className={styles.goodDetail}>
                  <h3 className={styles.goodTitle}>{item.title}</h3>
                  <span className={`${styles.price} themeColor`}>￥{item.price}</span>
                  <div className={styles.msgLine}>
                    <span className={styles.msgItem}>浏览：{item.brose}</span>
                    <span className={styles.msgItem}>收藏:{item.collect}</span>
                    {/* <span className={styles.msgItem}>留言0</span> */}
                  </div>
                </div>

              </div>

              <div className={styles.btnWrap}>
                <Button type='default' className={styles.concealCollect}  size='small' onClick={()=>this.saleOut(item)}>下架</Button>
                <Button type='warning' className={styles.concealCollect}  size='small' onClick={()=>{this.goToEdit(item)}}>编辑</Button>
              </div>
            </div>
          )
        })}
        {/* <div className={styles.publishItem}>
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

          <div className={styles.btnWrap}>
            <Button type='default' className={styles.concealCollect}  size='small'>编辑</Button>
            <Button type='warning' className={styles.concealCollect}  size='small'>编辑</Button>
          </div>
        </div> */}
        {/* <div className={styles.publishItem}>
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

          <div className={styles.btnWrap}>
            <Button type='default' className={styles.concealCollect}  size='small'>编辑</Button>
            <Button type='warning' className={styles.concealCollect}  size='small'>编辑</Button>
          </div>
        </div> */}
      </div>
    )
  }
  render() {
    return (

        <div className={styles.publishWrap}>
          <NavBar history={this.props.history} title={'下架商品'}></NavBar>
          {this.renderSoldOut()}
        </div>

    )
  }
}
const mapStateToProps = state=>({
  publishGoodList: state.mine.publishGoodList,
  BASE_URL: state.mine.BASE_URL
})
export default connect(mapStateToProps)(index)
