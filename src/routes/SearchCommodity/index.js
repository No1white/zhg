import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { connect } from 'dva'
import {List, Drawer} from 'antd-mobile'
import CommodityList from '../Home/components/CommodityList'
import SearchBar from '../components/SearchBar'
// import SearchBar from '../Home/components/SearchBar'
import TabarMenu from '../../components/TabBarMenu'
import styles from './index.less'
 class index extends Component {
  constructor(props) {
    super(props);
    this.state ={
      quertyParams: {
        type: '0'
      }
    }
  }
  componentDidMount() {
    this.getCommodityList()
    console.log(this.props);

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

  renderTopBar = () => {

  }
  openDrawer = () => {
    this.setState({
      open:true,
    });
  }
  onOpenChange = (...args) => {
    console.log(args);
    console.log(this.state);
    this.setState({ open: !this.state.open });
  }
  render() {
    const { commodityList = []} = this.props;
    console.log(commodityList);
    return (
      <div className={styles.searchCommodityWrap}>
        <NavBar history={this.props.history} />
        <div className={styles.searchBar}>
          <SearchBar ></SearchBar>
        </div>
        <TabarMenu openDrawer={this.openDrawer}></TabarMenu>
        <CommodityList  zIndexFlag={true}></CommodityList>
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  commodityList: state.home.commodityList
})
export default connect(mapStateToProps)(index)
