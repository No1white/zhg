import React, { Component } from 'react';
import { Tabs, WhiteSpace,Button } from 'antd-mobile';

class index extends React.Component {
  renderContent = tab =>
    (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
      <p>Content of {tab.title}</p>
    </div>);
  render() {
    const tabs = [
      { title: '全部' },
      { title: '服装' },
      { title: '数码' },
      { title: '百货' },
      { title: '配饰' },
      { title: '潮玩' },
      { title: '美妆' },
      { title: '食品' },
      { title: '家居' },
    ];

    return (
      <div >
        <WhiteSpace />
        <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props}  page={5} />}>
          {this.renderContent}
        </Tabs>
        <Button>test</Button>
        <WhiteSpace />
      </div>
    );
  }
}
export default index;
