import React, { Component } from 'react'
import {Button} from 'antd-mobile'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList:[
        {
          userName: '林舒平',
          phone: '18060570739',
          addressInfo: {
            province: '福建省',
            city: '福州市',
            region:'闽侯县',
            detail:  '闽江学院'
          },
          default:true
        }
      ]
    }
  }
  render() {
    const {addressList} = this.state;
    return (
      <div className={styles.addressListWrap}>
        <div className={styles.addressList}>
          <div className={styles.addressItem}>
            <div className={styles.userInfoWrap}>
              <div className={styles.userInfo}>
                <sapn className={styles.userName}>林舒平</sapn>
                <sapn className={styles.userPhone}>18060570739</sapn>
              </div>
              <div className={styles.addressInfo}>
                <sapn className={`${styles.label}`}>
                  默认
                </sapn>
                <span className={styles.address}>
                  福建省漳州市平和县文峰镇高速路口对象
                </span>
              </div>

            </div>
            <div className={styles.edit}>
                <span className={styles.btn}>编辑</span>
              </div>
            </div>

        </div>
      </div>
    )
  }
}
export default index
