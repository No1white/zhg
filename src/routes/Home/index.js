import React, { Component } from 'react';
import { createForm } from 'rc-form';
import SearchBar from './components/SearchBar';
import TabBar from './components/TabBar'
import HotSale from './components/HotSale'
import CommodityList from './components/CommodityList'
import styles from './index.less';

class index extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

  }
  renderContent = tab => {
    console.log(tab);
    return (
      (
        <div>
          <HotSale />
          <CommodityList />
        </div>
      )
    );
  }

  renderHeader = () => {
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
      <div className={styles.headerWrap}>
        <div className={styles.fixWrap}>
          <div className={styles.top}>
            <div className={styles.left}>
              <h2 className={styles.title}>置换购</h2>
            </div>
            <div className={styles.middle} />
            <div className={styles.right} />
            <SearchBar />
          </div>
        </div>

        <TabBar tabs={tabs} renderContent={this.renderContent} />
      </div>
    );
  }
  render() {
    return (
      <div className={styles.homeWrap}>
        {this.renderHeader()}
      </div>
    );
  }
}
const HomeWrap = createForm()(index);
export default HomeWrap;
