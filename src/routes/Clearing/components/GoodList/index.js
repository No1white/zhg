import React, { Component } from 'react'
import { List, Checkbox, Flex,Radio,WingBlank,InputItem } from 'antd-mobile';
import styles from './index.less'
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
export default class index extends Component {
  onChange = (val) => {
    console.log(val);
  }
  render() {
    const {goodList = [],allChecked =false,userId,goodListCheckChange} = this.props;

    return (
      <div className={styles.goodListWrap} >
        <div className={styles.goodList}>
            <WingBlank>
              {goodList.map(item => {
                return (
                  <div className={styles.goodItem}>

                    <img className={styles.goodImg} src={item.url} alt=""/>
                    <div className={styles.goodInfo}>
                      <p className={`${styles.p} ${styles.goodTitle}`}>{item.title}</p>
                      <p className={`${styles.p} ${styles.specification}`}>{item.specification}</p>
                      <p className={`${styles.p} ${styles.price}`}>{item.price}</p>

                    </div>
                  </div>
                )
              })}
              <div className={styles.dealInfo}>
                <div className={`${styles.dealList}`}>
                  <div className={`${styles.dealItem}`}>
                    <span className={`${styles.title} ${styles.flex1}`}>交易方式</span>
                    <sapn className={`${styles.content} ${styles.flex1}`}>普通配送</sapn>
                    <div className={`value ${styles.flex1}`}>快递<sapn className={'iconfont  icon-jiantou1'}></sapn></div>
                  </div>
                </div>
                <div className={`${styles.dealList}`}>
                  <div className={`${styles.dealItem}`}>
                    <span className={`${styles.title} ${styles.flex1}`}>配送方式</span>
                    <sapn className={`${styles.content} ${styles.flex1}`}>普通配送</sapn>
                    <div className={`value ${styles.flex1}`}>快递<sapn className={'iconfont  icon-jiantou1'}></sapn></div>
                  </div>
                </div>
                <div className={`${styles.dealList}`}>
                  <div className={`${styles.dealItem}`}>
                    <span className={`${styles.title} ${styles.flex1}`}>订单备注</span>
                    <InputItem
                      // {...getFieldProps('input3')}
                      className={`${styles.content} ${styles.flex1}`}
                      placeholder="选填，请先和卖家协商一致"
                    />
                    <div className={`value ${styles.flex1}`}></div>
                  </div>
                </div>
              </div>
              <div className={styles.totalWrap}>
                <div className={styles.total}>
                  <sapn className={styles.num}>共计1件</sapn>
                  <span className={`${styles.price} themeColor`}>￥69.00</span>
                </div>
              </div>
            </WingBlank>
        </div>
      </div>
    )
  }
}
