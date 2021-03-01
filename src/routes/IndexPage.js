/*
 * @Author: your name
 * @Date: 2020-12-25 10:03:44
 * @LastEditTime: 2021-02-19 19:14:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\IndexPage.js
 */
import React,{Component} from 'react';
import { connect } from 'dva';
import Navigation from './components/Navigation'
import Home from './Home'
import goTo from '@/utils/goTo'
import Cart from './Cart'
import styles from './IndexPage.less';

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    goTo('/home',this.props.history)
  }
  renderContent = (key)=> {
    // switch(key) {
    //   case 'home':
    //     return (
    //       <Home />
    //     )
    //     break;
    //   case 'cart':
    //     return (
    //       <Cart />
    //     )
    //   default:
    //     break;
    // }
  }
  render() {
    return (
      <div className={styles.indexPageWrap}>
        {/* <Navigation renderContent={this.renderContent} className={styles.navigation} /> */}
      </div>
    )
  }
}


export default connect()(IndexPage);
