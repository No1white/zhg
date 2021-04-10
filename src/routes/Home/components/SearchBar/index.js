/*
 * @Author: your name
 * @Date: 2020-12-25 10:49:13
 * @LastEditTime: 2021-04-10 16:14:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Home\components\SearchBar\index.js
 */
import React, { Component } from 'react';
import { AutoComplete,Input } from 'antd';
import styles from './index.less';


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeOut: {}
    }
  }

  render() {
    let timeOut = '';
    const onSearch = (searchText) => {

    };
    const onSelect = (data) => {
      this.setState({
        word:encodeURI(data),
      })
    };
    const onChange = (data) => {
      if(timeOut) {
        clearTimeout(timeOut)
      }
      if(timeOut) {
        timeOut= ''
      }
      timeOut = setTimeout(()=> {
        this.props.getHotWords(data);
        this.setState({
          word:data,
        })
      },300);



    };
    const { options = [],handleSearchBtn} = this.props;
    return (
      <div className={styles.searchBar}>
        <div className={styles.search}>
            <AutoComplete
            // options={options}
            // style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            className={styles.searchInput}
            placeholder="请输入关键词"
          />
          <button className={styles.searchBtn} onClick={()=>{handleSearchBtn(this.state.word)}}>搜索</button>
          <span className={`iconfont icon-search ${styles.searchIcon}`} />
        </div>


      </div>
    );
  }
}

