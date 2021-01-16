import React, { Component } from 'react'
import NavBar from '../AddressMange/Components/NavBar'
import styles from './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className={styles.successWrap}>
        <NavBar history={this.props.history}></NavBar>
        <div className={styles.title}></div>
      </div>
    )
  }
}
export default index
