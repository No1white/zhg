/*
 * @Author: your name
 * @Date: 2021-02-01 19:10:55
 * @LastEditTime: 2021-02-28 17:39:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\components\DropdownMenu\index.js
 */
import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd';
import { connect} from 'dva';
import { createForm } from 'rc-form';
import { Drawer, List, NavBar, Icon,InputItem,Button } from 'antd-mobile';
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryPamras: {

      },
      compositeLabel: '综合',

      labels:[
        {label:  '全新', value: '0',checked: false,},
        {label:  '95新', value: '1',checked: false,},
        {label:  '9成新', value: '2',checked: false,},
        {label:  '8成新', value: '3',checked: false,},
        {label:  '二手', value: '4',checked: false,},
      ],
      timeLabels: [
        {label: '1天内', value: '1',checked: false,},
        {label: '3天内', value: '3',checked: false,},
        {label: '7天内', value: '7',checked: false,},
        {label: '30天内', value: '30',checked: false,},
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
  //处理筛选商品
  handleConfirmFilter =() => {
    const { labels, timeLabels} =this.state;
    const { getFieldsValue } = this.props.form;
    const {handleFilterGoodList} = this.props;
    const values = getFieldsValue();
    let days = '';
    let degree  = '';
    labels.forEach(item => {
      if(item.checked) {
        degree = item.value;
      }
    })
    timeLabels.forEach(item => {
      if(item.checked) {
        days = item.value;
      }
    })
    this.setState({
      open:false,
    })
    handleFilterGoodList({
      days,
      degree,
      ...values,
    })
  }
  resetLabels = () => {
    const { labels, timeLabels} =this.state;
    labels.forEach(item => {
      item.checked = false;
    })
    timeLabels.forEach(item => {
      item.checked = false;
    });
    this.setState({
      labels,
      timeLabels,
    })
  }
  handleCheckLabel =(label,property) => {
    const labels = this.state[property];
    labels.forEach(item => {
      if(item.label === label) {
        item.checked =true;
      }else {
        item.checked= false;
      }
    })
    this.setState({
      [property]: labels
    })
  }
  sidebarRender = () => {
    const {labels =[], timeLabels=[]} = this.state;
    const {getFieldProps} = this.props.form;
    return (
      <div className={styles.sidebarContainer}>
          <List className={styles.sidebarWrap}>
            <div className={styles.labelFilter}>
              <h2 className={styles.title}>新旧程度</h2>
              <div className={styles.labels}>
                {labels.map((item,index) => {
                  return (
                    <span key={index} className={`${styles.label} ${item.checked ? 'themeColor' : ''}`} onClick={()=>{this.handleCheckLabel(item.label,'labels')}} >{item.label}</span>
                  )
                })}
              </div>
            </div>
            <div className={styles.priceFilter}>
              <h2 className={styles.title}>价格</h2>
              <div className={styles.labels}>
                <InputItem
                  className={styles.input}
                  {...getFieldProps('lowPrice')}
                  placeholder="最低价"
                ></InputItem>
                <span>-</span>
                <InputItem
                  {...getFieldProps('highPrice')}
                  className={styles.input}
                  placeholder="最高价"
                ></InputItem>
              </div>
            </div>
            <div className={styles.timeFilter}>
              <h2 className={styles.title}>发布时间</h2>
              <div className={styles.labels}>
              {timeLabels.map((item,index) => {
                  return (
                    <span key={index} className={`${styles.label} ${item.checked ? 'themeColor' : ''}`} onClick={()=>{this.handleCheckLabel(item.label,'timeLabels')}} >{item.label}</span>
                  )
                })}
              </div>
            </div>
        </List>
          <div className={styles.btnGroup}>
            <Button className={styles.btn} type="default" inline size="larger" style={{ marginRight: '4px' }} onClick={this.resetLabels}>重置</Button>
            <Button className={styles.btn} type="primary" inline size="largar" style={{ marginRight: '4px' }} onClick={this.handleConfirmFilter}>确定</Button>
          </div>
      </div>
    )
  }
  render() {

    const {onComposite,onCredit,creditFlag,compositeList,handleFilterGoodList} = this.props;
    const { compositeLabel } = this.state;
    const menu = (
      <Menu style={{width:'100%'}}>
        {compositeList.map((item,index) => {
          return (
            <Menu.Item key={index} danger={item.checked} onClick={()=>{this.setState({compositeLabel:item.label});onComposite(item.value)}}>
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

    return (
      <div className={styles.dropdownMenuWap}>
        <Drawer
              className={`${styles.myDrawer} ${this.state.open ? 'showEle' : 'hideEle'}`}

              // style={{ minHeight: document.documentElement.clientHeight }}
              enableDragHandle
              contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42,zIndex:-1 }}
              sidebar={this.sidebarRender()}
              position={'right'}
              open={this.state.open}
              onOpenChange={this.onOpenChange}
            >
        </Drawer>
        <Dropdown
          overlay={menu}
          overlayStyle={{width:'100%'}}

          >
          <a className={`${styles.menuItem} "ant-dropdown-link" themeColor`} >
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
          <a className={`${styles.menuItem} "ant-dropdown-link"`}
            onClick={()=>{
              handleFilterGoodList();
            }}>
            综合<span className={`icon-jiantou2 iconfont`}></span>
          </a>
        </Dropdown>
        <a className={`${styles.menuItem} "ant-dropdown-link"`} onClick={this.openDrawer}>
            筛选<span className={`icon-shaixuan iconfont`}></span>
        </a>
      </div>
    )
  }
}
const indexWrap = createForm()(index);

export default connect()(indexWrap)
