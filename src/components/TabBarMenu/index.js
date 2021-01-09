import React, { Component } from 'react'
import { List, Radio, Flex, WhiteSpace,Drawer,InputItem,Button} from 'antd-mobile';
import styles from './index.less'
const RadioItem = Radio.RadioItem;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state ={
      composite: false,
      credit: false,
      region: false,
      markFlag:false,
      open: false,
    }
  }
  filterChoice = (key)=> {
    const newState = {
      composite: false,
      credit: false,
    };
    if(key === 'credit') {
      this.setState({
        [key]: true,
        composite: false,
        region: false,
        markFlag: false,
      })
      console.log(this.state);
    } else {
      newState[key] = !this.state[key];
      this.setState({
        ...newState,
        'markFlag':true,
      })
    }

  }
  hideFilter = () =>{
    this.setState({
      composite: false,
      credit: false,
      markFlag:false,
    })
    console.log(this.state);
  }
  openDrawer = () => {
    this.setState({
      open:true,
    });
  }
  onOpenChange = (...args) => {
    console.log(args);
    console.log('1');
    this.setState({ open: !this.state.open });
  }
  sidebar = () => {
    const labels = [
      {label:  '全新', value: 'new'},
      {label:  '全新', value: 'new'},
      {label:  '全新', value: 'new'},
      {label:  '全新', value: 'new'},
      {label:  '全新', value: 'new'},
      {label:  '全新', value: 'new'},
      {label:  '全新', value: 'new'},
    ];
    const timeLabels = [
      {label: '1天内', value: '1'},
      {label: '1天内', value: '1'},
      {label: '1天内', value: '1'},
      {label: '1天内', value: '1'},
      {label: '1天内', value: '1'},
      {label: '1天内', value: '1'},
    ]
    return (
      <div className={styles.sidebarContainer}>
          <List className={styles.sidebarWrap}>
            <div className={styles.labelFilter}>
              <h2 className={styles.title}>快捷筛选</h2>
              <div className={styles.labels}>
                {labels.map(item => {
                  return (
                    <sapn className={styles.label}>{item.label}</sapn>
                  )
                })}
              </div>
            </div>
            <div className={styles.priceFilter}>
              <h2 className={styles.title}>价格</h2>
              <div className={styles.labels}>
                <InputItem
                  className={styles.input}
                  // {...getFieldProps('preice')}
                  placeholder="最低价"
                ></InputItem>
                <sapn>-</sapn>
                <InputItem
                  // {...getFieldProps('preice')}
                  className={styles.input}
                  placeholder="最高价"
                ></InputItem>
              </div>
            </div>
            <div className={styles.timeFilter}>
              <h2 className={styles.title}>发布时间</h2>
              <div className={styles.labels}>
              {timeLabels.map(item => {
                  return (
                    <sapn className={styles.label}>{item.label}</sapn>
                  )
                })}
              </div>
            </div>
        </List>
          <div className={styles.btnGroup}>
            <Button className={styles.btn} type="default" inline size="larger" style={{ marginRight: '4px' }}>重置</Button>
            <Button className={styles.btn} type="primary" inline size="largar" style={{ marginRight: '4px' }}>确定</Button>
          </div>
      </div>
    )
  }
  render() {
    const list = [
      {
        title: '综合',
        key: 'composite',
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
        key: 'credit',
        child:[]
      },
    ];
    const data = [
      { value: 0, label: 'doctor' },
      { value: 1, label: 'bachelor' },
    ];
    const {openDrawer} = this.props;
    return (

      <div className={styles.tarbarMenu}>

        <div className={styles.filterList}>
          {
            list.map((item,index) => {
              return (
                  <div
                    className={`${styles.filterItem} ${this.state[item.key] ? styles.filterActive : ''}`}
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
          <div
            className={`${styles.filterItem} }`}
            onClick={this.openDrawer}
            >
              筛选
              <sapn className={'iconfont icon-shaixuan'}></sapn>
          </div>

        </div>
        {
          list.map(item =>{
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
        <div className={`${styles.drawerWrap} ${this.state.open ? 'showEle' :'hideEle'}`}>
          <Drawer
              className={styles.myDrawer}
              style={{ minHeight: document.documentElement.clientHeight }}
              enableDragHandle
              contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42,zIndex:-1 }}
              sidebar={this.sidebar()}
              position={'right'}
              open={this.state.open}
              onOpenChange={this.onOpenChange}
            >
            </Drawer>
        </div>

        <div className={`${styles.mark } ${this.state.markFlag ? 'ShowEle' :'hideEle'}`} onClick={this.hideFilter}></div>

      </div>
    )
  }
}
