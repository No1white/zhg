import React, { Component } from 'react'
import styles from './index.less'
export default class index extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {title,renderRight} = this.props;
    return (
      <div className={styles.headerWrap}>
        <div className={styles.fixWrap}>
          <div className={styles.top}>
            <div className={styles.left}>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <div className={styles.middle} />
            <div className={styles.right} >
              {renderRight()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
