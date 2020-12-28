import React,{Component} from 'react';
import { connect } from 'dva';
import Navigation from './components/Navigation'
import Home from './Home'
import Cart from './Cart'
import styles from './IndexPage.less';

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }
  renderContent = (key)=> {
    console.log(key);
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
