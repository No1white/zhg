import React, { Component } from 'react'
// import history from '../../utils/history'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  goBack = ()=>{
    console.log(this.props);
    this.props.history.goBack()
  }
  render() {
    return (
      <div className={styles.navBarWrap} onClick={this.goBack}>
        <div className={styles.backBtn} >
          <span className={`iconfont icon-jiantou ${styles.btn}`}></span>
        </div>
      </div>
    )
  }
}
export default index
