/*
 * @Author: your name
 * @Date: 2020-12-25 11:29:11
 * @LastEditTime: 2021-03-21 13:47:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Home\components\TabBar\index.js
 */
import React, { Component } from 'react';
import { Tabs, WhiteSpace,Button } from 'antd-mobile';
import styles from './index.less'
import { connect } from 'dva';
class index extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
  }
  render() {
    const {tabs,renderContent,handleTabClick,initialPage} = this.props;
    return (
      <div className={styles.tabsWrap}>
        <WhiteSpace />
        <Tabs
          tabs={tabs}
          initialPage={parseInt(initialPage)}
          tabBarPosition={'top'}
          renderTabBar={props => <Tabs.DefaultTabBar {...props}  page={5} />}
          tabBarActiveTextColor={'#fe4c17'}
          onTabClick ={handleTabClick}
        //   styles={{
        //   topTabBarSplitLine: {
        //     color:'#fe4c17'
        //   },
        // }}
        tabBarUnderlineStyle={{border:'1px solid #fe4c17'}}
          >
          {renderContent}
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}
export default connect()(index)
