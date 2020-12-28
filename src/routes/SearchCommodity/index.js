import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import SearchBar from '../components/SearchBar'
import TabarMenu from '../../components/TabBarMenu'
import styles from './index.less'
export default class index extends Component {
  renderTopBar = () => {

  }
  render() {
    return (
      <div className={styles.searchCommodityWrap}>
        <NavBar />
        <div className={styles.searchBar}>
          <SearchBar ></SearchBar>
        </div>
        <TabarMenu></TabarMenu>
      </div>
    )
  }
}
