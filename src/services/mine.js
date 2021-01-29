/*
 * @Author: your name
 * @Date: 2021-01-17 20:51:22
 * @LastEditTime: 2021-01-29 18:37:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\services\mine.js
 */
import request from '../utils/request';
import getPath from '../utils/getPath'


// 发送验证码
export const sendVerifyCode = (params) => {
  return request.get(getPath('/api/mine/sendcode'),params);
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

