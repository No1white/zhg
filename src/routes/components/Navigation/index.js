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
        key: 'sale',
        icon: 'icon-jiahao2',
        selectedIcon: 'icon-jiahao1'
      },
      // {
      //   title:'购物车',
      //   key: 'cart',
      //   icon: 'icon-cart-full',
      //   selectedIcon: 'icon-cart-Empty-fill'
      // },
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
    let hiddenFlag = true;
    const { history:{location : {pathname}}} = this.props;
    tabBarList.forEach(item => {
      if(item.key === pathname.substr(1)) {
        hiddenFlag =false;
      }
    });
    const {renderContent}= this.props;
    return (
      <div >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#ff5f0f"
          barTintColor="white"
          hidden={hiddenFlag}
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
                      this.props.goTo(item.key)
                      this.setState({
                        selectedTab: item.key
                      });
                    }}
                    data-seed="logId"
                  >
                    {/* {renderContent(item.key)} */}
                </TabBar.Item>
              )
            })
          }
        </TabBar>
      </div>
    );
  }
}

export default index
