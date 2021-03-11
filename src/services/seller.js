/*
 * @Author: your name
 * @Date: 2021-02-02 20:50:56
 * @LastEditTime: 2021-03-07 19:13:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\services\goodDetail.js
 */
import request from '../utils/request';
import getPath from '../utils/getPath'



export const getSellerInfo = (params) => {
  return request.get(getPath('/api/seller/getSellerInfo'),params);
}

