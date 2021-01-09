import React, { Component } from 'react'
import {ListView,Flex} from 'antd-mobile'
import ActivityIndicator from '../../../../components/ActivityIndicator'
import HotSale from '../HotSale'
import styles from './index.less'
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
    };
  }
  onEndReached = () =>{
    this.props.getCommodityList();
  }
  goToDetail = (id) =>{
    // console.log(this.props);
    // this.props.history.push()
    this.props.history.push(`/commodityDetail/${id}`)
  }

  row = (row)=>{
    return (

          <div className={styles.commodityItem} onClick={()=> {this.goToDetail(row.id)}}>
            <img src={row.url} className={styles.img} />
            <p className={styles.title}>{row.title}</p>
            <p className={styles.price}>{row.price}</p>
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
          pageSize={4}
          initialListSize={4}
          onEndReached={this.onEndReached}
          renderFooter={() => {            if (!hasMore) return <div style={{ textAlign: 'center' }}>无更多数据了</div>;
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
