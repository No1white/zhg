import React, { Component } from 'react'
import {WingBlank,Button} from 'antd-mobile'
import NavBar from '../../../AddressMange/Components/NavBar'
import TabBar from '../../../Home/components/TabBar'
import styles from './index.less'

// 收藏夹
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  handleTabClick = (data) =>{
    console.log(data);
  }
  renderTabBar = () => {
    const tabs = [
      {
        title: '全部',
        type: '0',
      },
      { title: '待发货',
        type: '1',
      },
      { title: '待收货',
        type: '2',
      },
      { title: '评价',
        type: '3',
      }

    ];
    return (
      <div className={styles.tabBarWrap}>
        <TabBar tabs={tabs} handleTabClick={this.handleTabClick} renderContent={this.renderOrderList}  />
      </div>
    )

  }
  renderOrderList = (tab) => {
    return (
      <div className={styles.orderList}>

        <div className={styles.orderItem}>
          <div className={styles.goodInfo}>

            <img className={styles.goodImg} src={'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1587601794,489963968&fm=11&gp=0.jpg'}></img>
            <div className={styles.goodDetail}>
              <h3 className={styles.goodTitle}>Dior迪奥粉底foreve</h3>
              <span className={`${styles.price} themeColor`}>￥300</span>

            </div>

          </div>

          <div className={styles.footerWrap}>
            {/* <div className={styles.priceWrap}>
              实付款：<span className={`${styles.price} themeColor`}>￥5.o</span>
            </div> */}
            <div className={styles.contact}>
              <sapn className={`iconfont icon-pinglun1`}></sapn>
              联系卖家
            </div>
            <div className={styles.btnGroup}>
            <Button type='default' className={styles.concealCollect}  size='small'>查看物流</Button>
            {/* <Button type='warning' className={styles.concealCollect}  size='small'>确认收货</Button> */}
            <Button type='warning' className={styles.concealCollect}  size='small'>评价</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (

        <div className={styles.orderWrap}>
          <NavBar history={this.props.history} title={'我的订单'}></NavBar>
          {this.renderTabBar()}
          {/* {this.renderOrderList()} */}
        </div>

    )
  }
}
export default index
