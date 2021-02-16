/*
 * @Author: your name
 * @Date: 2021-02-12 19:47:53
 * @LastEditTime: 2021-02-16 18:53:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\services\clearing.js
 */
import request from '../utils/request';
import getPath from '../utils/getPath'


// 调用支付接口
export const sendPayRequest = (params) => {
  return request.post(getPath('/api/clearing/pay'),params);
};

// 提交订单
export const trans = (params) => {
  return request.post(getPath('/api/clearing/trans'),params);
};

// 获取用户上架中的商品
export const getUserGoods = (params) => {
  return request.post(getPath('/api/clearing/getUserGoods'),params);
};
// 创建订单
export const createOrder = (params) => {
  return request.post(getPath('/api/clearing/createOrder'),params);
};
