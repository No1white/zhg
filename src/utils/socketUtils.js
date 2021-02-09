/*
 * @Author: your name
 * @Date: 2021-02-06 16:42:01
 * @LastEditTime: 2021-02-06 16:44:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\utils\socket.js
 */
let socket = ''
function connect() {
  socket = require('socket.io-client')('http://localhost:3000');

}
export default {
  connect,
  socket
}
