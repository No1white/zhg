import React, { Component } from 'react'
import { List, Checkbox,WingBlank,InputItem} from 'antd-mobile';
import { createForm } from 'rc-form';
import constObj from '@/utils/constObj.js'
import styles from './index.less'
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalPrice: 0,
    }
  }
  onChange = (userId) => {
    const {goodList} = this.state;
    goodList.forEach(item =>{
      if(item.userId === userId) {
        const allChecked = !item.allChecked;
        item.allChecked = allChecked;
        item.goodList.forEach(listItem => {
          listItem.checked = allChecked
        })
      }
    })
    this.setState({
      goodList
    })
    this.reCount()

  }
  goodListCheckChange = (userId,goodId)=>{
    const {goodList} = this.state;

    goodList.forEach(item =>{
      let i = 0;

      if(item.userId === userId) {

        item.goodList.forEach(listItem => {
          if(listItem.goodId === goodId) {
            listItem.checked=!listItem.checked;

          }
          if(listItem.checked) {
            i++;
          }

          // listItem.checked = allChecked
        })
          // 所有商品如果选择则全选
        if(i>= item.goodList.length) {
          item.allChecked=true;
        } else {
          item.allChecked =false;
        }
      }


    })
    this.setState({
      goodList
    });
    this.reCount()
  }
  reCount = () => {
    const {goodList} = this.state;
    let sum = 0;
    goodList.forEach(item => {
      item.goodList.forEach(goodItem => {
        if(goodItem.checked) {
          sum+=goodItem.price;
        }
      })
    });
    this.props.changeTotalPrice(sum);
  }
  render() {
    const { getFieldProps } = this.props.form;
    const {goodList = [],onRemarkChange,remark} = this.props;
    return (
      <WingBlank className={styles.container}>
        <div className={styles.commodityWrap}>
            <List className={styles.commodityList}>
              {goodList.map(i => {
                return (
                  <div className={styles.commodityItem}>

                    <div className={styles.shopName}>{i.nickName}</div>

                    <div className={styles.goodListWrap}>
                      <div className={styles.goodList}>
                          <WingBlank>
                              <div className={styles.title}>退款商品</div>
                              <div className={styles.goodItem}>

                                <img className={styles.goodImg} src={i.imgList && i.imgList[0]} alt=""/>
                                <div className={styles.goodInfo}>
                                  <p className={`${styles.p} ${styles.goodTitle}`}>{i.title}</p>
                                  <p className={`${styles.p} ${styles.specification}`}>{i.specification}</p>
                                  <p className={`${styles.p} ${styles.price} themeColor`}>￥{i.price}</p>

                                </div>
                              </div>

                            {/* <div className={styles.totalWrap}>
                              <div className={styles.total}>
                                <span className={styles.num}>共计1件</span>
                                <span className={`${styles.price} themeColor`}>￥{goodList && goodList[0].price}</span>
                              </div>
                            </div> */}
                          </WingBlank>
                      </div>
                    </div>


                  </div>
                )
              })}
            </List>
      </div>

      </WingBlank>
    )
  }
}
export default createForm()(index);
