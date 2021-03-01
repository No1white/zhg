/*
 * @Author: your name
 * @Date: 2020-12-28 17:45:23
 * @LastEditTime: 2021-02-28 20:05:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\services\home.js
 */
import request from '../utils/request';
import getPath from '../utils/getPath'

// export function getHotSale() {
//   return request(getPath('/api/hotSale'));
// }


const postOptions = (params = {}) => ({
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(params),
  mode: 'cors',
});

// 获取热门推荐
export const getHotSale = (params) => {
  return request.get(getPath('/api/home/hotSale'),params
  );
};

// 获取商品列表
export const getCommodityList = (params) => {
  return request.get(getPath('/api/home/commodityList'), params

    );
};
// 获取热搜词
export const getHotWords = (params) => {
  return request.get(getPath('/api/home/hotWords'),params

  );
};
// 获取筛选后的商品列表
export const filterGoodList = (params) => {
  return request.post(getPath('/api/home/searchGoodList'),params

  );
};

// 退款申请
export const reFound = (params) => {
  return request.post(getPath('/api/home/searchGoodList'),params

  );
};
