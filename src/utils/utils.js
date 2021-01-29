/*
 * @Author: lsp
 * @Date: 2021-01-24 19:24:54
 * @LastEditTime: 2021-01-24 19:52:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\utils\utils.js
 */


/**
 * @description: 将对象中的数组层去掉
 * @param {Object} obj  getValueFromObjectArr
 * @return {Object} rObj
 */
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

export default {
  getValueFromObjectArr
}
