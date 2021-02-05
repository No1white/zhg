/*
 * @Author: your name
 * @Date: 2021-02-01 19:10:55
 * @LastEditTime: 2021-02-02 20:06:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\components\DropdownMenu\index.js
 */
import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd';
import { Drawer, List, NavBar, Icon,InputItem,Button } from 'antd-mobile';
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryPamras: {

      },
      compositeLabel: '综合',
      compositeList : [
        {
          label: '综合',
          value: 0,
          checked: false,
        },
        {
          label: '价格升序',
          value: 1,
          checked: false,
        },
        {
          label: '价格降序',
          value: 2,
          checked: false,
        },
        {
          label: '最新发布',
          value: 3,
          checked: false,
        },
      ],
      open: false, // sider打开的标识
    }
  }
  onComposite = (value) => {
    const {queryPamras} = this.state;
    queryPamras.order=  value;
    this.setState({
      queryPamras
    })

  }
  openDrawer = () => {
    this.setState({
      open:true,
    });
  }
  sidebarRender = () => {
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

    const {onComposite,onCredit,creditFlag,compositeList} = this.props;
    const { compositeLabel } = this.state;
    console.log(this.props);
    console.log(compositeList);
    const menu = (
      <Menu style={{width:'100%'}}>
        {compositeList.map(item => {
          return (
            <Menu.Item danger={item.checked} onClick={()=>{this.setState({compositeLabel:item.label});onComposite(item.value)}}>
              {item.label}
            </Menu.Item>
          )
        })}

      </Menu>
    );
    const menu2 = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3rd menu item
          </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
      </Menu>
    )
    const sidebar = (<List>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
          if (index === 0) {
            return (<List.Item key={index}
              thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
              multipleLine
            >Category</List.Item>);
          }
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          >Category{index}</List.Item>);
        })}
      </List>);
    return (
      <div className={styles.dropdownMenuWap}>

        <Dropdown
          overlay={menu}
          overlayStyle={{width:'100%'}}
          >
          <a className={`${styles.menuItem} "ant-dropdown-link"`} onClick={e => e.preventDefault()}>
            {compositeLabel}<span className={`icon-jiantou2 iconfont`}></span>
          </a>
        </Dropdown>
        <a className={`${styles.menuItem} "ant-dropdown-link" ${creditFlag ? 'themeColor' : ''}`} onClick={()=>{onCredit()}}>
          信用
        </a>
        <Dropdown
          overlay={menu2}
          overlayStyle={{width:'100%'}}
        >
          <a className={`${styles.menuItem} "ant-dropdown-link"`} onClick={e => e.preventDefault()}>
            综合<span className={`icon-jiantou2 iconfont`}></span>
          </a>
        </Dropdown>
        <a className={`${styles.menuItem} "ant-dropdown-link"`} onClick={this.openDrawer}>
            筛选<span className={`icon-shaixuan iconfont`}></span>
        </a>
        {/* <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebarStyle={{ border: '1px solid #ddd' }}
        sidebar={sidebar}
        open={this.state.open}
        docked={false}
      >
        Click upper-left corner
      </Drawer> */}
        {/* <Drawer
              className={styles.myDrawer}
              // style={{ minHeight: document.documentElement.clientHeight }}
              enableDragHandle
              contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42,zIndex:-1 }}
              sidebar={this.sidebarRender()}
              position={'right'}
              open={this.state.open}
              onOpenChange={this.onOpenChange}
            >
            </Drawer> */}
      </div>
    )
  }
}
export default index
