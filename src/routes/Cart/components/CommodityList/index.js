import React, { Component } from 'react'
import { List, Checkbox,WingBlank} from 'antd-mobile';
import GoodList from '../GoodList'
import storage from '@/utils/storage'
import styles from './index.less'
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

export default class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      cartList: [
        {
          nickName: '店铺名字',
          userId: 0,
          allChecked: false,
          goodList:[
            {
              goodId:1,
              title: 'good1111111111111111111',
              price: 23.5,
              url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3561334530,324071453&fm=26&gp=0.jpg',
              specification: '空白',
              checked:false,
            },
            {
              goodId:2,
              title: 'good1111111111111111111',
              price: 23.5,
              url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3561334530,324071453&fm=26&gp=0.jpg',
              specification: '空白',
              checked:true,
            },
            {
              goodId:3,
              title: 'good1111111111111111111',
              price: 23.5,
              url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3561334530,324071453&fm=26&gp=0.jpg',
              specification: '空白',
              checked:false,
            }
          ]
        },
        {
          nickName: '店铺名字',
          userId: 1,
          allChecked:false,
          goodList:[
            {
              goodId:1,
              title: 'good1111111111111111111',
              price: 43.5,
              url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3561334530,324071453&fm=26&gp=0.jpg',
              specification: '空白',
              checked:true,
            },
            {
              goodId:2,
              title: 'good1111111111111111111',
              price: 53.5,
              url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3561334530,324071453&fm=26&gp=0.jpg',
              specification: '空白',
              checked:true,
            },
            {
              goodId:3,
              title: 'good1111111111111111111',
              price: 63.5,
              url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3561334530,324071453&fm=26&gp=0.jpg',
              specification: '空白',
              checked:false,
            }
          ]
        }
      ],
      totalPrice: 0,
    }
  }
  onChange = (userId) => {
    const {cartList} = this.state;
    // const userList = cartList.filter(item => {
    //   return item.userId === userId
    // });
    cartList.forEach(item =>{
      if(item.userId === userId) {
        const allChecked = !item.allChecked;
        item.allChecked = allChecked;
        item.goodList.forEach(listItem => {
          listItem.checked = allChecked
        })
      }
    })
    this.setState({
      cartList
    })
    this.reCount()
    // userList.goodList
  }
  goodListCheckChange = (userId,goodId)=>{
    const {cartList} = this.state;
    // const userList = cartList.filter(item => {
    //   return item.userId === userId
    // });
    cartList.forEach(item =>{
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
      cartList
    });
    this.reCount()
  }
  reCount = () => {
    const {cartList} = this.state;
    let sum = 0;
    cartList.forEach(item => {
      item.goodList.forEach(goodItem => {
        if(goodItem.checked) {
          sum+=goodItem.price;
        }
      })
    });
    this.props.changeTotalPrice(sum);
  }
  render() {
    const cartGoodList = storage.get('cartGoodList');

    const {cartList} = this.state;
    return (

        <div className={styles.commodityWrap}>
            <List className={styles.commodityList}>
              {cartList.map(i => {
                return (
                  <div className={styles.commodityItem}>
                    {/* <CheckboxItem
                      key={i.value}
                      defaultChecked={i.allChecked}
                      onChange={() => this.onChange(i.userId)}
                      checked={i.allChecked}
                      >
                      {i.nickName}
                    </CheckboxItem> */}
                    <h2>{i.nickName}</h2>
                    <div className={styles.goodListWrap}>
                      <GoodList
                        userId ={i.userId}
                        goodList={i.goodList}
                        allChecked={i.allChecked}
                        goodListCheckChange={this.goodListCheckChange}
                        ></GoodList>
                    </div>
                  </div>
                )
              })}
            </List>
      </div>
    )
  }
}
