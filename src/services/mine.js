/*
 * @Author: your name
 * @Date: 2021-01-17 20:51:22
 * @LastEditTime: 2021-02-04 21:42:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\services\mine.js
 */
import request from '../utils/request';
import getPath from '../utils/getPath'


// 发送验证码
export const sendMessage = (params) => {
  return request.get(getPath('/api/message/send'),params);
};

// 注册
export const register = (params) => {
  return request.post(getPath('/api/mine/register'),params);
};

// 发送验证码
export const login = (params) => {
  return request.post(getPath('/api/mine/login'),params);
};

// 实名认证
export const autonym = (params) => {
  return request.post(getPath('/api/mine/autonym'),params);
};

// 获取发布的商品
export const getPublishGoodList = (params) => {
  return request.get(getPath('/api/mine/getPubshGoodList'),params);
};
// 获取发布的商品
export const saveAddressInfo = (params) => {
  return request.post(getPath('/api/mine/saveAddress'),params);
};
// 获取三级级联数据
export const getLevelAddress = (params) => {
  return request.get(getPath('/api/mine/getLevelAddress'),params);
};
// 获取地址信息列表
export const getAddressList = (params) => {
  return request.get(getPath('/api/mine/getAddressList'),params);
};
// 修改地址信息列表
export const alterAddress = (params) => {
  return request.post(getPath('/api/mine/alterAddress'),params);
};

// 删除地址信息
export const delAddress = (params) => {
  return request.post(getPath('/api/mine/delAddress'),params);
};
