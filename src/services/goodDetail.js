/*
 * @Author: your name
 * @Date: 2021-02-02 20:50:56
 * @LastEditTime: 2021-03-21 17:14:49
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

// 增加浏览量
export const addBrouse = (params) => {
  return request.get(getPath('/api/goodDetail/addBrouse'),params);
};
// 收藏商品
export const collectGood = (params) => {
  return request.post(getPath('/api/goodDetail/collectGood'),params);
};
// 关注卖家
export const attentionUser = (params) => {
  return request.post(getPath('/api/goodDetail/attentionUser'),params);
};
// 获取收藏
export const getCollectFlag = (params) => {
  return request.post(getPath('/api/goodDetail/getCollectFlag'),params);
};
// 获取关注的人
export const getAttentionFlag = (params) => {
  return request.post(getPath('/api/goodDetail/getAttentionFlag'),params);
};
