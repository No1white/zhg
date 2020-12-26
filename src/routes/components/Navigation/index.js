import React from 'react'
import { TabBar } from 'antd-mobile';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: true,
    };
  }



  render() {
    const tabBarList = [
      {
        title:'首页',
        key: 'home',
        icon: 'icon-home',
        selectedIcon: 'icon-home-fill'
      },
      {
        title:'卖闲置',
        key: 'idle',
        icon: 'icon-jiahao2',
        selectedIcon: 'icon-jiahao1'
      },
      {
        title:'购物车',
        key: 'cart',
        icon: 'icon-cart-full',
        selectedIcon: 'icon-cart-Empty-fill'
      },
      {
        title:'消息',
        key: 'message',
        icon: 'icon-xiaoxi1',
        selectedIcon: 'icon-xiaoxi'
      },
      {
        title:'我的',
        key: 'mine',
        icon: 'icon-wode',
        selectedIcon: 'icon-iconfontwo'
      }
    ];
    const {renderContent}= this.props;
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          {
            tabBarList.map(item => {
              return (
                <TabBar.Item
                    title={item.title}
                    key={item.key}
                    icon={<div style={{
                      width: '26px',
                      height: '26px',
                      fontSize: '26px', }}
                      className={`iconfont ${item.icon}`}
                    />
                    }
                    selectedIcon={<div style={{
                      width: '26px',
                      height: '26px',
                      fontSize: '26px',}}
                      className={`iconfont ${item.selectedIcon}`}
                    />
                    }
                    selected={this.state.selectedTab === item.key}

                    onPress={() => {
                      this.setState({
                        selectedTab: item.key
                      });
                    }}
                    data-seed="logId"
                  >
                    {renderContent(item.key)}
                </TabBar.Item>
              )
            })
          }
          {/* <TabBar.Item
            title="首页"
            key="home"
            icon={<div style={{
              width: '26px',
              height: '26px',
              fontSize: '26px', }}
              className={'iconfont '}
            />
            }
            selectedIcon={<div style={{
              width: '26px',
              height: '26px',
              fontSize: '26px',}}
              className={'iconfont '}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}

            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('Life')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '26px',
              height: '26px',
              fontSize: '26px', }}
              className={'iconfont icon-jiahao2'}
              />
            }
            selectedIcon={
              <div style={{
                width: '26px',
                height: '26px',
                fontSize: '26px', }}
                className={'iconfont icon-jiahao1'}
              />
            }
            title="卖闲置"
            key="idle"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent('Koubei')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '26px',
                height: '26px',
                fontSize: '26px',}}
                className={'iconfont icon-cart-full'}
              />
            }
            selectedIcon={
              <div style={{
                width: '26px',
                height: '26px',
                fontSize: '26px',}}
                className={'iconfont icon-cart-Empty-fill'}
              />
            }
            title="购物车"
            key="cart"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '26px',
                height: '26px',
                fontSize: '26px',}}
                className={'iconfont icon-xiaoxi1'}
              />
            }
            selectedIcon={
              <div style={{
                width: '26px',
                height: '26px',
                fontSize: '26px',}}
                className={'iconfont icon-xiaoxi'}
              />
            }
            title="消息"
            key="message"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '26px',
                height: '26px',
                fontSize: '26px',}}
                className={'iconfont icon-wode'}
              />
            }
            selectedIcon={
              <div style={{
                width: '26px',
                height: '26px',
                fontSize: '26px',}}
                className={'iconfont icon-iconfontwo'}
              />
            }
            title="我的"
            key="mine"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item> */}
        </TabBar>
      </div>
    );
  }
}

export default index
