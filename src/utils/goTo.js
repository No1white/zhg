/*
 * @Author: your name
 * @Date: 2020-12-26 13:24:37
 * @LastEditTime: 2021-01-25 19:06:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\utils\goTo.js
 */
export default (url,history,params = {})=> {
  history.push({
    pathname: url,
    query: params,
  });
}
