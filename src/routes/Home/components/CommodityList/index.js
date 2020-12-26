import React, { Component } from 'react'
import styles from './index.less'
export default class index extends Component {
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
    ]
    return (
      <div className={styles.commodityWrap}>
        <div className={styles.commodityList}>
          {
            commodityList.map(item =>{
              return (
                <div className={styles.commodityItem}>
                  <img src={item.url} className={styles.img} />
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.price}>{item.price}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
