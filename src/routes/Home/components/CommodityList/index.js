import React, { Component } from 'react'
import {ListView} from 'antd-mobile'
import HotSale from '../HotSale'
import styles from './index.less'
export default class index extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID][rowID];
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }
  onEndReached = () =>{
    console.log('1');
  }
  row = (row)=>{
    console.log(row);
    return (

          <div className={styles.commodityItem}>
            <img src={row.url} className={styles.img} />
            <p className={styles.title}>{row.title}</p>
            <p className={styles.price}>{row.price}</p>
          </div>

    )
  }
  render() {
    const commodityList = [
      {
        id:1,
        title: 'JackJones杰克琼斯秋冬保暖含绵羊毛休闲毛呢大衣男装中长款外套',
        url:'//img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/305358018/O1CN01AN0sra296IGgHz83O_!!305358018.jpg_60x60q90.jpg',
        price: 123.5,
      },
      {
        id:2,
        title: 'JackJones杰克琼斯秋冬保暖含绵羊毛休闲毛呢大衣男装中长款外套',
        url:'//img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/305358018/O1CN01AN0sra296IGgHz83O_!!305358018.jpg_60x60q90.jpg',
        price: 123.5,
      },
      {
        id:3,
        title: '木林森男士轻薄羽绒服短款2020年新款潮流百搭帅气秋冬季男装外套',
        url :'//img.alicdn.com/imgextra/i1/3173051986/O1CN01n8AHCs1QXdDHGM0JZ_!!3173051986.jpg_60x60q90.jpg',
        price: 235.5
      },
      {
        id:4,
        title: '木林森男士轻薄羽绒服短款2020年新款潮流百搭帅气秋冬季男装外套',
        url :'//img.alicdn.com/imgextra/i1/3173051986/O1CN01n8AHCs1QXdDHGM0JZ_!!3173051986.jpg_60x60q90.jpg',
        price: 235.5
      }
    ];
    const {isLoading =true} =  this.props;
    console.log(commodityList);
    console.log(this.state.dataSource.cloneWithRows(commodityList));
    return (
      // <div className={styles.commodityWrap}>
      //   <div className={styles.commodityList}>
      //     {
      //       commodityList.map(item =>{
      //         return (
      //           <div className={styles.commodityItem}>
      //             <img src={item.url} className={styles.img} />
      //             <p className={styles.title}>{item.title}</p>
      //             <p className={styles.price}>{item.price}</p>
      //           </div>
      //         )
      //       })
      //     }
      //   </div>
      // </div>
      <div className={styles.commodityWrap}>
        <ListView
          ref={el => this.lv = el}

          renderHeader={() => < HotSale list={this.props.list}></ HotSale>}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          dataSource={this.state.dataSource.cloneWithRows(commodityList)}
          // renderSectionHeader={sectionData => (
          //   <div>{`Task ${sectionData.split(' ')[1]}`}</div>
          // )}
          // renderBodyComponent={() => <MyBody />}
          renderRow={this.row}
          className={styles.commodityList}
          // renderSeparator={separator}
          style={{
            width: '100%',
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={20}
          initialListSize={20}
          onScroll={() => { console.log('scroll'); }}
          // scrollRenderAheadDistance={500}
          // onEndReached={this.onEndReached}
          // onEndReachedThreshold={10}
        />
      </div>
    )
  }
}
