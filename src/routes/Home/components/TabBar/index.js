import React, { Component } from 'react';
import { Tabs, WhiteSpace,Button } from 'antd-mobile';

class index extends React.Component {

  render() {
    const {tabs,renderContent} = this.props;

    return (
      <div>
        <WhiteSpace />
        <Tabs
          tabs={tabs}
          tabBarPosition={'top'}
          renderTabBar={props => <Tabs.DefaultTabBar {...props}  page={5} />}
          tabBarActiveTextColor={'#fe4c17'}
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
export default index;
