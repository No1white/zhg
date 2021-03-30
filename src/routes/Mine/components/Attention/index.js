/*
 * @Author: your name
 * @Date: 2021-01-16 16:50:43
 * @LastEditTime: 2021-03-22 11:07:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 *
 * @FilePath: \react-shop-admin-masterf:\zhg\zhg\src\routes\Mine\components\Attention\index.js
 */
import React, { Component } from 'react'
import {WingBlank,Button,Toast} from 'antd-mobile'
import NavBar from '../../../AddressMange/Components/NavBar'
import styles from './index.less'
import { connect} from 'dva';
import storage from '../../../../utils/storage';

// 收藏夹
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    this.getAttentionListInfo();
  }

  getAttentionListInfo = () => {
    const userInfo = storage.get('userInfo');
    this.props.dispatch({
      type:'mine/getAttentionListInfo',
      payload: {
        userId:userInfo.userId
      }
    })
  }
  concealAttention = (sellerId) => {
    const userInfo = storage.get('userInfo')||{};
    if(!userInfo.userId) {
      Toast.info('您还未登录，请先登录');
      return;
    }
    this.props.dispatch({
      type:'goodDetail/attentionUser',
      payload: {
        sellerId,
        userId:userInfo.userId,
        attentionFlag:true,
      },
      callback: result => {
        this.getAttentionListInfo();
      }
    })
  }
  goToSellerInfo = (userId) => {
    this.props.history.push(`/seller/${userId}`)
  }
  renderAttentionList = () => {
    const {attentionListInfo=[]} = this.props;
    return (
      <div className={styles.attentionList}>
        {
          attentionListInfo.map(item => {
            return (
              <div className={styles.attentionItem} key={item.userId}>
                <div className={styles.userInfo}>
                  <div className={styles.userInfoContainer} onClick={()=>this.goToSellerInfo(item.userId)}>
                    <img className={styles.avatar} src={item.avatar}></img>
                    <span className={styles.userName}>昵称:{item.nickName}</span>
                  </div>
                  <Button
                    type={'default'}
                    className={`${styles.concealAttention} themeColor`}
                    size='small'
                    onClick={()=>this.concealAttention(item.userId)}>取消关注</Button>
                  {/* <span className={`${styles.price} themeColor`}>￥700</span> */}
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

        <div className={styles.attentionWrap}>
          <NavBar history={this.props.history} title={'关注的人'}></NavBar>
          {this.renderAttentionList()}
        </div>

    )
  }
}
const  mapStateToProps = (state)=>({
  attentionListInfo: state.mine.attentionListInfo,
})
export default connect(mapStateToProps)(index)
