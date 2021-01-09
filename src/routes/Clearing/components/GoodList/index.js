import React, { Component } from 'react'
import { List, Checkbox, Flex,Radio,WingBlank } from 'antd-mobile';
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
                    <CheckboxItem
                      defaultChecked={item.checked || allChecked}
                      checked={item.checked}
                      onChange={()=>{goodListCheckChange(userId,item.goodId)}}>
                    </CheckboxItem>
                    <img className={styles.goodImg} src={item.url} alt=""/>
                    <div className={styles.goodInfo}>
                      <p className={`${styles.p} ${styles.goodTitle}`}>{item.title}</p>
                      <p className={`${styles.p} ${styles.specification}`}>{item.specification}</p>
                      <p className={`${styles.p} ${styles.price}`}>{item.price}</p>

                    </div>
                  </div>
                )
              })}
            </WingBlank>
        </div>
      </div>
    )
  }
}
