/*
 * @Author: lsp
 * @Date: 2021-01-25 19:49:14
 * @LastEditTime: 2021-02-07 20:42:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Message\Components\MessageList\index.js
 */

import React, { Component } from 'react'
import { ListView,Flex, Badge } from 'antd-mobile';
import ActivityIndicator from '@/components/ActivityIndicator'
import styles from './index.less'
const data = [
  {
    userId: '12312',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614168308&t=7194becd92734473b4488de7f33b7083',
    msg: '消息',
    timer: '6小时'
  },
  {
    userId: '12312',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614168308&t=7194becd92734473b4488de7f33b7083',
    msg: '消息',
    timer: '6小时'
  },
  {
    userId: '12312',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614168308&t=7194becd92734473b4488de7f33b7083',
    msg: '消息',
    timer: '6小时'
  },
];
class index extends Component {
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
  goToSend = (userId) => {

    this.props.history.push(`/message/sendMessage/${userId}`)
  }
  row = (row)=>{
    return (

      <div className={styles.messageItem} onClick={()=> {this.goToSend(row.userId)}}>
        <img className={styles.avatar} src={row.receiverAvatar}></img>
        <div className={styles.userInfo}>
          <h3 className={`${styles.userName} pMargin0`}>{row.receiverNickName}</h3>
          <p className={`${styles.msg} `}>{row.msg}</p>
          <p className={styles.timer}>{row.createTime}</p>
        </div>
        <div className={styles.messageNum}>
          <Badge text={row.unreadNum} overflowCount={55} />
        </div>

      </div>

    )
  }
  render() {
    const {isLoading =true,loading, hotList,commodityList = [],hasMore,getCommodityList,zIndexFlag = false,messageList=[]} =  this.props;
    return (
      <div className={styles.messageListWrap}>

        <ListView
          ref={el => this.lv = el}
          renderHeader={this.renderHeader}
          dataSource={this.state.dataSource.cloneWithRows(messageList)}
          renderRow={this.row}
          className={styles.messageList}
          style={{
            width: document.documentElement.clientWidth,
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={4}
          initialListSize={4}
          onEndReached={this.onEndReached}
          renderFooter={() => {            if (!hasMore) return <div style={{ textAlign: 'center' }}>没有更多聊天信息了！</div>;
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
export default index
