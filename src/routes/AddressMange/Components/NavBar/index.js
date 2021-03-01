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
    this.props.history.goBack()
  }
  // goTo = ()=>{
  //   this.props.history.push('')
  // }
  render() {
    const {title, renderRight} = this.props;
    return (
      <div className={styles.navBarWrap} >
        <div className={styles.backBtn} onClick={this.goBack} >
          <span className={`iconfont icon-jiantou ${styles.btn}`}></span>
        </div>
        <div className={styles.navBarTitle}>{title}</div>
        <div className={styles.rightPart} >
          {renderRight && renderRight()}
        </div>
      </div>
    )
  }
}
export default index
