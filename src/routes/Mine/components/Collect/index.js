import React, { Component } from 'react'
import {WingBlank,Button} from 'antd-mobile'
import NavBar from '../../../AddressMange/Components/NavBar'
import styles from './index.less'

// 收藏夹
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  renderCollectList = () => {
    return (
      <div className={styles.collectList}>
        <div className={styles.collectItem}>
          <div className={styles.userInfo}>
            <img className={styles.avatar} src={'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1587601794,489963968&fm=11&gp=0.jpg'}></img>
            <sapn className={styles.userName}>昵称123123123</sapn>
            <span className={`${styles.price} themeColor`}>￥700</span>
          </div>
          <div className={styles.goodInfo}>
            <div className={styles.imgList}>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
            </div>
            <div className={styles.goodTitle}>
              '小米8 64g 64gb'
            </div>
          </div>
          <div className={styles.btnWrap}>
            <div></div>
            <Button className={styles.concealCollect}  size='small' icon={<span className={'iconfont icon-collection'}></span>}>取消收藏</Button>
          </div>
        </div>
        <div className={styles.collectItem}>
          <div className={styles.userInfo}>
            <img className={styles.avatar} src={'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1587601794,489963968&fm=11&gp=0.jpg'}></img>
            <sapn className={styles.userName}>昵称123123123</sapn>
            <span className={`${styles.price} themeColor`}>￥700</span>
          </div>
          <div className={styles.goodInfo}>
            <div className={styles.imgList}>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
              <img className={styles.imgItem} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F5301ff11ly1gb58jwjhikj20p00p0q4l.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613101033&t=74ba277221fa436673ac595d9119ae39'></img>
            </div>
            <div className={styles.goodTitle}>
              '小米8 64g 64gb'
            </div>
          </div>
          <div className={styles.btnWrap}>
            <Button className={styles.concealCollect}  size='small' icon={<span className={'iconfont icon-collection'}></span>}>取消收藏</Button>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (

        <div className={styles.collectWrap}>
          <NavBar history={this.props.history} title={'我的收藏'}></NavBar>
          {this.renderCollectList()}
        </div>

    )
  }
}
export default index
