/*
 * @Author: your name
 * @Date: 2021-02-04 21:41:28
 * @LastEditTime: 2021-02-05 21:04:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\services\message.js
 */
import request from '../utils/request';
import getPath from '../utils/getPath'


// 获取接受者信息
export const getReceiverInfo = (params) => {
  return request.get(getPath('/api/message/getReceiverInfo'),params);
};
