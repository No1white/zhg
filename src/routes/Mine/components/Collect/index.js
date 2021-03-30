/*
 * @Author: your name
 * @Date: 2021-01-12 20:15:11
 * @LastEditTime: 2021-03-29 16:53:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-shop-admin-masterf:\zhg\zhg\src\routes\Mine\components\Collect\index.js
 */
import React, { Component } from 'react'
import {WingBlank,Button,Toast} from 'antd-mobile'
import {connect} from 'dva';
import goTo from '@/utils/goTo'
import NavBar from '../../../AddressMange/Components/NavBar'
import styles from './index.less'
import storage from '../../../../utils/storage';

// 收藏夹
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    this.getCollectListInfo();
  }
  getCollectListInfo = () => {
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type:'mine/getCollectListInfo',
      payload:{
        userId:userInfo.userId,
      }
    })
  }
  handleCollect = (goodId) => {
    const userInfo = storage.get('userInfo')||{};
    if(!userInfo.userId) {
      Toast.info('您还未登录，请先登录');
      return;
    }
    this.props.dispatch({
      type:'goodDetail/collectGood',
      payload: {
        goodId,
        userId:userInfo.userId,
        collectFlag:true,
      },
      callback: result => {
        this.getCollectListInfo();
      }
    })
  }
  goToDetail = (goodId) =>{
    // this.props.history.push()
    this.props.history.push(`/commodityDetail/${goodId}`)
  }
  renderCollectList = () => {
    const {collectListInfo=[]} = this.props;
    return (
      <div className={styles.collectList}>
        {
          collectListInfo.map(item => {
            return (
              <div className={styles.collectItem} key={item.goodId}>
                <div className={styles.userInfo}>

                  <img className={styles.avatar} src={item.avatar}></img>
                  <span className={styles.userName}>{item.nickName}</span>
                  <span className={`${styles.price} themeColor`}>￥{item.price}</span>
                </div>
                <div className={styles.goodInfo} onClick={()=>this.goToDetail(item.goodId)}>
                  <div className={styles.goodTitle}>
                    {item.title}
                  </div>
                  <div className={styles.imgList}>
                    {
                      item.imgList.map((imgItem,imgIndex)=>{
                        return(
                          <img className={styles.imgItem} src={imgItem} key={imgIndex}></img>
                        )
                      })
                    }

                  </div>

                </div>
                <div className={styles.btnWrap}>
                  <div></div>
                  <Button
                  className={styles.concealCollect}
                  size='small'
                  icon={<span className={'iconfont icon-collection'}></span>}
                  onClick={()=>this.handleCollect(item.goodId)}>取消收藏</Button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  render() {
    return (

        <div className={styles.collectWrap}>
          <NavBar history={this.props.history} title={'我的收藏'}></NavBar>
          {this.renderCollectList()}
        </div>

    )
  }
}
const mapStateToProps = (state)=>({
  collectListInfo: state.mine.collectListInfo,
});
export default connect(mapStateToProps)(index)
