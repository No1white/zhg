/*
 * @Author: your name
 * @Date: 2021-01-18 20:16:42
 * @LastEditTime: 2021-04-18 20:46:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \react-shop-admin-masterf:\zhg\zhg\src\utils\storage.js
 */
//封装操作localstorage本地存储的方法

var storage = {

  //存储
  set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.log(error);
    }
  },
  // 删除数据
  remove(key) {
  localStorage.removeItem(key);
  }

  }

  // 暴露给外部访问
  export default storage;
