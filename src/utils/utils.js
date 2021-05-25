/*
 * @Author: lsp
 * @Date: 2021-01-24 19:24:54
 * @LastEditTime: 2021-03-29 11:26:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\utils\utils.js
 */


/**
 * @description: 将对象中的数组层去掉
 * @param {Object} obj  getValueFromObjectArr
 * @return {Object} rObj
 */
import {Toast} from 'antd-mobile'
import goTo from './goTo'
const getValueFromObjectArr = (obj)=> {
  const rObj = {};
  Object.keys(obj).forEach(item => {
    if(Array.isArray(obj[item])) {
      rObj[item] = obj[item][0]
    }else if(obj[item] === undefined || obj[item] === null){

    } else {
      rObj[item] = obj[item];
    }
  })
  return rObj
}

const authLogin = (obj,history,callback)=> {
  if(JSON.stringify(obj) === '{}') {
    Toast.info('您还未登录');
    goTo('/mine/login',history);
    return ;
  }else if(obj.autonym === 1) {
    Toast.info('您还未实名,请先实名');
    goTo('/mine/settings/autonym',history);
    return ;
  }else {
    callback();
  }
}
export default {
  getValueFromObjectArr,
  authLogin
}
