import React,{Component} from 'react';
import { connect } from 'dva';
import Navigation from './components/Navigation'
import Home from './Home'
import styles from './IndexPage.less';

class IndexPage extends Component {

  renderContent = (key)=> {
    console.log(key);
    switch(key) {
      case 'home':
        console.log('home');
        return (
          <Home />
        )
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className={styles.indexPageWrap}>
        <Navigation renderContent={this.renderContent} className={styles.navigation} />
      </div>
    )
  }
}


export default connect()(IndexPage);
