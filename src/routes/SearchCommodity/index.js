/*
 * @Author: your name
 * @Date: 2020-12-28 14:28:06
 * @LastEditTime: 2021-02-28 17:34:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\SearchCommodity\index.js
 */
import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { connect } from 'dva'
import {List, Drawer,Toast} from 'antd-mobile'
import { Menu, Dropdown } from 'antd';
import DropdownMenu from './components/DropdownMenu'
import CommodityList from '../Home/components/CommodityList'
import SearchBar from '../components/SearchBar'
// import SearchBar from '../Home/components/SearchBar'
import TabarMenu from '../../components/TabBarMenu'
import styles from './index.less'
 class index extends Component {
  constructor(props) {
    super(props);
    const {match:{ params:{word}}} =props;
    this.state ={
      queryParams: {
        page: 1,
        order: 0,
        word:word,
      },
      creditFlag: false,
      compositeList : [
        {
          label: '综合',
          value: 0,
          checked: true,
        },
        {
          label: '价格升序',
          value: 1,
          checked: false,
        },
        {
          label: '价格降序',
          value: 2,
          checked: false,
        },
        {
          label: '最新发布',
          value: 3,
          checked: false,
        },
      ],
    }
  }
  componentDidMount() {
    this.handleFilterGoodList()

  }

  handleFilterGoodList = (addFilter = {}) => {
    const { compositeList =[],queryParams} =this.state;
    let sort = 0;
    compositeList.forEach(item => {
      if(item.checked) {
        sort = item.value;
      }
    })
    this.props.dispatch({
      type: 'home/filterGoodList',
      payload:{
        ...queryParams,
        sort,
        ...addFilter,

      },
    })
  }
  addPage = ()=> {
    const {queryParams} = this.state;
    queryParams.page = queryParams.page+1;
   this.setState({
     queryParams
   })
 }

  getCommodityList = () => {
    const {queryParams} = this.state;
    const { location :{pathname}} = this.props;
    const pathnameList = pathname.split('/')
    this.props.dispatch({
      type: 'home/filterGoodList',
      payload: {
        ...queryParams,

      },
    });
  }

  renderTopBar = () => {

  }
  openDrawer = () => {
    this.setState({
      open:true,
    });
  }
  onComposite = (value) => {
    let {queryParams,compositeList} = this.state;
    compositeList.forEach(item => {
      if(value === item.value) {
        item.checked =  true;
      } else {
        item.checked = false;
      }
    })
    queryParams.order = value;
    this.setState({
      queryParams,
      compositeList
    });
    this.handleFilterGoodList()
  }
  onCredit = () => {
    this.setState({
      creditFlag: !this.state.creditFlag
    });

  }
  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
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
  handleSearchBtn = (word)=> {
    // const {quertyParams} = this.state;
    // this.props.dispatch({
    //   type: 'home/getCommodityList',
    //   payload: {
    //     ...quertyParams,
    //     word,
    //   },
    // });
    if(word === undefined || word === null) {
      Toast.info('请输入关键词');
      return;
    } else {
      this.props.history.push(`/search/${word}`)
    }
  }
  render() {
    const { searchCommodityList = [],hasMore,history,loading,location,match,hotWords} = this.props;
    const {pathname} = location;
    const { params:{word}} = match;
    const {queryParams,creditFlag,compositeList} = this.state;
    return (
      <div className={styles.searchCommodityWrap}>
        <NavBar history={this.props.history} />
        <div className={styles.searchBar}>
          <SearchBar
          getHotWords ={this.getHotWords}
          word={word}
          options={hotWords}
          handleSearchBtn= {this.handleSearchBtn}
          ></SearchBar>
        </div>
        {/* <TabarMenu openDrawer={this.openDrawer}></TabarMenu> */}
        <DropdownMenu
          creditFlag = {creditFlag}
          onCredit ={this.onCredit}
          onComposite={this.onComposite}
          compositeList={compositeList}
          handleFilterGoodList={this.handleFilterGoodList}

        ></DropdownMenu>
        <CommodityList
          page={queryParams.page}
          loading={loading}
          history={history}
          addPage={this.addPage}
          getCommodityList={this.getCommodityList}
          hasMore={hasMore}
          commodityList= {searchCommodityList}
          zIndexFlag={true}></CommodityList>
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  // commodityList: state.home.commodityList,
  hotWords: state.home.hotWords,
  searchCommodityList: state.home.searchCommodityList,
  hasMore: state.home.searchCommodityListHasMore,
  loading: state.loading.models.home
})
export default connect(mapStateToProps)(index)
