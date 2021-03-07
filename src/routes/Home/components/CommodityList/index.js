/*
 * @Author: your name
 * @Date: 2020-12-25 17:30:20
 * @LastEditTime: 2021-03-06 17:24:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Home\components\CommodityList\index.js
 */
import React, { Component } from 'react'
import {ListView,Flex} from 'antd-mobile'
import ActivityIndicator from '../../../../components/ActivityIndicator'
import HotSale from '../HotSale'
import styles from './index.less'

let lastTime = null;
export default class index extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID][rowID];
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight ,
      page:1,
      lastTime:null,
    };
  }
  throttle =(func, wait) =>{
    console.log('节流函数中');
    // let lastTime = null;// 为了避免每次调用lastTime都被清空，利用js的闭包返回一个function;此外声明为全局变量也可以
    return function() {
      console.log(lastTime);
        console.log(now - lastTime - wait > 0);
        let now = new Date();
        // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
        if (now - lastTime - wait > 0) {
            func();
            lastTime = now;
        }
    }
    // this.setState({
    //   lastTime,
    // })
  }
  onEndReached = () =>{
    let now = new Date();
    if(this.props.hasMore) {
      this.props.addPage();
      console.log('节流开始');
      this.props.getCommodityList(this.props.page+1);
      // this.throttle(()=>{
      //   console.log('节流结束');
      //   this.props.addPage();
      //   this.props.getCommodityList(this.props.page+1);
      // },500)();
    }
  }
  goToDetail = (goodId) =>{
    // console.log(this.props);
    // this.props.history.push()
    this.props.history.push(`/commodityDetail/${goodId}`)
  }

  row = (row)=>{
    return (

          <div className={styles.commodityItem}  onClick={()=> {this.goToDetail(row.goodId)}}>
            <img src={row.url} className={styles.img} />
            <p className={styles.title}>{row.title}</p>
            <div className={styles.goodInfo}>
              <p className={`${styles.price} themeColor`}>￥{row.price}</p>
              <p className={styles.brose}>浏览：{row.brose}</p>
            </div>
            <div className={styles.userInfo}>
              <img className={styles.userAvatar} src={row.avatar}></img>
              <span className={styles.nickName}>{row.nickName}</span>
            </div>
          </div>

    )
  }
  renderHeader = () => {
    const {header = false,hotList} = this.props;
    if(header) {
      return (
        < HotSale list={hotList} goToDetail={this.goToDetail}></ HotSale>
      )
    } else {
      return <div></div>;
    }
  }
  render() {

    const {isLoading =true,loading, hotList,commodityList = [],hasMore,getCommodityList,zIndexFlag = false} =  this.props;
    console.log(commodityList);
    return (
      <div className={`${styles.commodityWrap} ${zIndexFlag ? styles.zIndex :''}`}>
        <ListView

          ref={el => this.lv = el}
          renderHeader={this.renderHeader}
          dataSource={this.state.dataSource.cloneWithRows(commodityList)}
          renderRow={this.row}
          className={styles.commodityList}
          style={{
            width: document.documentElement.clientWidth,
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={10}
          initialListSize={10}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          renderFooter={() => {            if (!hasMore) return <div style={{ textAlign: 'center',marginBottom:'50px'}}>无更多数据了</div>;
            if (!loading) return <div style={{ height: '0.2rem' }} />;
            return (
              <Flex justify="center">
                <ActivityIndicator />
              </Flex>
            );
          }}
        />
      </div>
    )
  }
}
