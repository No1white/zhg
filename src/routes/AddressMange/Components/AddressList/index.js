/*
 * @Author: your name
 * @Date: 2021-01-11 16:01:34
 * @LastEditTime: 2021-05-21 13:44:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\AddressMange\Components\AddressList\index.js
 */
import React, { Component } from 'react'
import {Button} from 'antd-mobile'
import goTo from '@/utils/goTo'
import stroage from '@/utils/storage'

import styles from './index.less'
import storage from '../../../../utils/storage'
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
  handleAddCheck = (addressId) =>{
    const addressList = storage.get('addressList');
    addressList.forEach(item => {
      if(item.addressId === addressId) {
        item.checked= true;
      }else {
        item.checked = false;
      }
    })
    storage.set('addressList',addressList);
    this.props.history.goBack(-1);
  }
  render() {
    const {addressList = []} = this.props;

    return (
      <div className={styles.addressListWrap}>
        <div className={styles.addressList}>
          {addressList.map(item => {
            return (
              <div className={styles.addressItem}  key={item.addressId} onClick={()=>this.handleAddCheck(item.addressId)}>
                <div className={styles.userInfoWrap} >
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{item.userName}</span>
                    <span className={styles.userPhone}>{item.phone}</span>
                  </div>
                  <div className={styles.addressInfo}>
                    {
                      item.defaultAddress === 0 || item.defaultAddress === '0'
                      ?  <span className={`${styles.label}`}>默认 </span> : ''
                    }

                    <span className={styles.address}>
                      {item.province}
                      {item.city}
                      {item.region ? item.region : ''}
                      {item.addressDetail ? item.addressDetail : ''}
                    </span>
                  </div>

                </div>
                <div className={styles.edit} onClick={(e)=>{e.stopPropagation(); goTo('/addAddress',this.props.history,item)}}>
                    <span className={styles.btn}>编辑</span>
                  </div>
            </div>
            );
          })}


        </div>
      </div>
    )
  }
}
export default index
