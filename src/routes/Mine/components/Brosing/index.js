import React, { Component } from 'react'
import {WingBlank,Button} from 'antd-mobile'
import NavBar from '../../../AddressMange/Components/NavBar'
import styles from './index.less'

// 历史浏览
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hisoryList: [
        {
          date: '2020-1-2',
          goodList: [
            {
              goodId: 1,
              goodUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613380726&t=89e0d08c28aaff2387e002a49b46ee36',
              price: 232.5
            },
            {
              goodId: 2,
              goodUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613380726&t=89e0d08c28aaff2387e002a49b46ee36',
              price: 232.5
            },
            {
              goodId: 3,
              goodUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613380726&t=89e0d08c28aaff2387e002a49b46ee36',
              price: 232.5
            }
          ]
        },
        {
          date: '2020-1-3',
          goodList: [
            {
              goodId: 1,
              goodUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613380726&t=89e0d08c28aaff2387e002a49b46ee36',
              price: 232.5
            },
            {
              goodId: 2,
              goodUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613380726&t=89e0d08c28aaff2387e002a49b46ee36',
              price: 232.5
            },
            {
              goodId: 3,
              goodUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613380726&t=89e0d08c28aaff2387e002a49b46ee36',
              price: 232.5
            },
            {
              goodId: 4,
              goodUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613380726&t=89e0d08c28aaff2387e002a49b46ee36',
              price: 232.5
            },
            {
              goodId: 5,
              goodUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613380726&t=89e0d08c28aaff2387e002a49b46ee36',
              price: 232.5
            }
          ]
        }
      ]
    }
  }
  renderBrosingList = () => {
    const {hisoryList = []} = this.state;
    return (
      <div className={styles.brosingList}>
        {hisoryList.map(item => {
          return (
            <div className={styles.brosingItem}>
              <span className={styles.date}>{item.date}</span>
              <div className={styles.goodList}>
                {item.goodList.map(goodItem =>{
                  return (
                    <div className={styles.goodItem}>
                      <img className={styles.goodImg} src={goodItem.goodUrl}></img>
                      <p className={`${styles.price} themeColor `}>￥{goodItem.price}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

      </div>
    )
  }
  render() {
    return (

        <div className={styles.brosingWrap}>
          <NavBar history={this.props.history} title={'历史浏览'}></NavBar>
          {this.renderBrosingList()}
        </div>

    )
  }
}
export default index
