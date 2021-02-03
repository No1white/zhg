/*
 * @Author: your name
 * @Date: 2020-12-28 14:28:06
 * @LastEditTime: 2021-02-02 19:10:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\SearchCommodity\index.js
 */
import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { connect } from 'dva'
import {List, Drawer} from 'antd-mobile'
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
    this.state ={
      queryParams: {
        category: '0',
        page: 1,
        order: 0,
        creditFlag: false,
      },
      compositeList : [
        {
          label: '综合',
          value: 0,
          checked: false,
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
      ]
    }
  }
  componentDidMount() {
    this.getCommodityList()

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
    this.props.dispatch({
      type: 'home/getCommodityList',
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
    })
  }
  onCredit = () => {
    this.setState({
      creditFlag: !this.state.creditFlag
    });

  }
  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }
  render() {
    const { commodityList = [],hasMore,history,loading} = this.props;
    const {queryParams,creditFlag,compositeList} = this.state;
    return (
      <div className={styles.searchCommodityWrap}>
        <NavBar history={this.props.history} />
        <div className={styles.searchBar}>
          <SearchBar ></SearchBar>
        </div>
        {/* <TabarMenu openDrawer={this.openDrawer}></TabarMenu> */}
        <DropdownMenu
          creditFlag = {creditFlag}
          onCredit ={this.onCredit}
          onComposite={this.onComposite}
          compositeList={compositeList}

        ></DropdownMenu>
        <CommodityList
          page={queryParams.page}
          loading={loading}
          history={history}
          addPage={this.addPage}
          getCommodityList={this.getCommodityList}
          hasMore={hasMore}
          // commodityList= {commodityList}
          zIndexFlag={true}></CommodityList>
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  commodityList: state.home.commodityList
})
export default connect(mapStateToProps)(index)
