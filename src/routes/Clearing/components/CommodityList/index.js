import React, { Component } from 'react'
import { List, Checkbox,WingBlank} from 'antd-mobile';
import GoodList from '../GoodList'
import styles from './index.less'
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

export default class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      goodList: [
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
    const {goodList} = this.state;
    // const userList = goodList.filter(item => {
    //   return item.userId === userId
    // });
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
    // userList.goodList
  }
  goodListCheckChange = (userId,goodId)=>{
    const {goodList} = this.state;
    // const userList = goodList.filter(item => {
    //   return item.userId === userId
    // });
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
    const data = [
      { value: 0, label: 'Ph.D.' },
      { value: 1, label: 'Bachelor' },
      { value: 2, label: 'College diploma' },
    ];
    const {goodList = []} = this.props;
    console.log(goodList);
    return (

      <WingBlank>
        <div className={styles.commodityWrap}>
            <List className={styles.commodityList}>
              {goodList.map(i => {
                return (
                  <div className={styles.commodityItem}>

                    <div className={styles.shopName}>{i.nickName}</div>

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
      </WingBlank>
    )
  }
}
