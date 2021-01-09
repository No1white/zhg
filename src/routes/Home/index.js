import React, { Component } from 'react';
import { connect } from 'dva'
import { createForm } from 'rc-form';
import {Toast} from 'antd-mobile'
import ActivityIndicator from '../../components/ActivityIndicator'
import SearchBar from './components/SearchBar';
import TabBar from './components/TabBar'
import HotSale from './components/HotSale'
import CommodityList from './components/CommodityList'
import styles from './index.less';

class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      quertyParams: {
        type: '0'
      }
    }

  }
  componentDidMount(){
    this.getHotSale();
    this.getCommodityList();
  }
  getHotSale = () => {
    const {quertyParams} = this.state;
    this.props.dispatch({
      type: 'home/getHotList',
      payload: {
        ...quertyParams
      },
    });
  }
  getCommodityList = () => {
    const {quertyParams} = this.state;
    this.props.dispatch({
      type: 'home/getCommodityList',
      payload: {
        ...quertyParams
      },
    });
  }
  getHotWords = (params) => {
    // const {quertyParams} = this.state;
    this.props.dispatch({
      type: 'home/getHotWords',
      payload: {
        word:params
      },
    });
  }
  handleTabClick = (data)=> {
    const {quertyParams} = this.state;
    const query = quertyParams;
    query.type = data.type;
    this.setState({
      quertyParams: {
        ...query
      }
    })
    this.getHotSale();
  }
  handleSearchBtn = (word)=> {
    // const {quertyParams} = this.state;
    // this.props.dispatch({
    //   type: 'home/getCommodityList',
    //   payload: {
    //     ...quertyParams,
    //     word,
    //   },
    // });
    console.log(this.props);
    if(word === undefined || word === null) {
      Toast.info('请输入关键词');
      return;
    } else {
      this.props.history.push(`/search/${word}`)
    }
  }
  renderContent = tab => {
    const {hotList,loading,commodityList,hasMore,history} = this.props;
    console.log(this.props);
    return (
      (
        <div>
          <ActivityIndicator animating={loading} ></ActivityIndicator>
          <CommodityList
            hotList={hotList}
            header = {true}
            loading={loading}
            history={history}
            getCommodityList={this.getCommodityList}
            commodityList= {commodityList}
            hasMore ={hasMore}
            />
        </div>
      )
    );
  }
  renderHeader = () => {
    const tabs = [
      {
        title: '全部',
        type: '0',
      },
      { title: '服装',
        type: '1',
      },
      { title: '数码',
        type: '2',
      },
      { title: '百货',
        type: '3',
      },
      { title: '配饰',
        type: '4',
      },
      { title: '潮玩',
        type: '5',
      },
      { title: '美妆',
        type: '6',
      },
      { title: '食品',
        type: '7'
      },
      { title: '家居',
        type: '8'
      },
    ];
    const {hotWords} = this.props;
    return (
      <div className={styles.headerWrap}>
        <div className={styles.fixWrap}>
          <div className={styles.top}>
            <div className={styles.left}>
              <h2 className={styles.title}>置换购</h2>
            </div>
            <div className={styles.middle} />
            <div className={styles.right} />
            <SearchBar
              getHotWords ={this.getHotWords}
              options={hotWords}
              handleSearchBtn= {this.handleSearchBtn}
              />
          </div>
        </div>
        <TabBar tabs={tabs} handleTabClick={this.handleTabClick} renderContent={this.renderContent} />
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
const mapStateToProps = state =>({
  hotList: state.home.hotList,
  commodityList: state.home.commodityList,
  hasMore: state.home.commodityListHasMore,
  hotWords: state.home.hotWords,
  loading: state.loading.models.home
})
export default connect(mapStateToProps)(HomeWrap);
