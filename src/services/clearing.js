/*
 * @Author: your name
 * @Date: 2021-02-12 19:47:53
 * @LastEditTime: 2021-02-24 19:06:25
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

// 提交订单号
export const success = (params) => {
  return request.get(getPath('/api/clearing/success'),params);
};

// 获取地址信息
export const getAddress = (params) => {
  return request.get(getPath('/api/clearing/getAddress'),params);
};

// 订单页面跳转支付
export const goToPay = (params) => {
  return request.post(getPath('/api/clearing/goToPay'),params);
};
