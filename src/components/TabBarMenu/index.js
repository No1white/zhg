import React, { Component } from 'react'
import { List, Radio, Flex, WhiteSpace } from 'antd-mobile';
import styles from './index.less'
const RadioItem = Radio.RadioItem;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state ={
      0: false,
      1: false,
      2: false,
      markFlag:false,
    }
  }
  filterChoice = (key)=> {
    console.log(key);
    this.setState({
      [key]:true,
      'markFlag':true,
    })
  }
  hideFilter = () =>{
    this.setState({
      0: false,
      1: false,
      2: false,
      markFlag:false,
    })
  }
  render() {
    const list = [
      {
        title: '综合',
        key: '0',
        child: [
          {
            title: '综合',
            key: 0,
            checked:true,
          },
          {
            title: '价格升序',
            key: 1,
            checked:false,
          }
        ]
      },
      {
        title: '信用',
        key: '2',
        child:[]
      },
      {
        title: '信用',
        key: '1',
        child: [
          {
            title: '综合',
            key: 0,
            checked:true,
          },
          {
            title: '价格升序',
            key: 1,
            checked:false,
          }
        ]
      },
    ];
    const data = [
      { value: 0, label: 'doctor' },
      { value: 1, label: 'bachelor' },
    ];
    return (

      <div className={styles.tarbarMenu}>
        <div className={styles.filterList}>
          {
            list.map((item,index) => {
              return (
                  <div
                    className={styles.filterItem}
                    onClick={()=>{this.filterChoice(item.key)}}>
                      {item.title}
                      {item.child.length>0
                        ? <sapn className={'iconfont icon-jiantou2'}></sapn>
                        : ''
                      }
                  </div>

              )
            })
          }
        </div>
        {
          list.map(item =>{
            console.log()
            return (
              <div className={`${styles.itemChild} ${this.state[item.key] ? 'showEle' : 'hideEle'}`}>
                <List >
                  {item.child.map(i => (
                    <RadioItem key={i.key} onChange={() => this.onChange(i.value)}>
                      {i.title}
                    </RadioItem>
                  ))}
                </List>
              </div>
            )
          })

        }
        <div className={`${styles.mark } ${this.state.markFlag ? 'ShowEle' :'hideEle'}`} onClick={this.hideFilter}></div>
      </div>
    )
  }
}
