/*
 * @Author: your name
 * @Date: 2021-01-24 20:00:55
 * @LastEditTime: 2021-01-24 20:01:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\services\sale.js
 */
import request from '../utils/request';
import getPath from '../utils/getPath'
// 发布商品
export const publishGood = (params) => {
  return request.post(getPath('/api/sale/good'),params);
};
