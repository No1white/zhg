/*
 * @Author: your name
 * @Date: 2021-02-02 20:50:56
 * @LastEditTime: 2021-02-02 20:52:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\services\goodDetail.js
 */
import request from '../utils/request';
import getPath from '../utils/getPath'


// 获取goodInfo
export const getGoodDetailInfo = (params) => {
  return request.get(getPath('/api/goodDetail/getGoodDetailInfo'),params);
};

