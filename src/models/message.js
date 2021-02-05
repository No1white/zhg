/*
 * @Author: your name
 * @Date: 2021-02-04 21:41:04
 * @LastEditTime: 2021-02-05 21:16:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\message.js
 */
import {
  getReceiverInfo


} from '../services/message'
import { Toast } from 'antd-mobile'
import storage from '../utils/storage'
const initState = {
  BASE_URL: 'http://qn2pi0q2o.hn-bkt.clouddn.com/',
  receiverInfo: {}
}
export default {

  namespace: 'message',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    // 发送验证码
    *getReceiverInfo({ payload }, { call, put }) {
      const reqParams = payload || {};
      console.log('getReceiverInfo');
      const { data } = yield call(getReceiverInfo, reqParams);
      console.log(data);
      yield put({
          type: 'save',
          payload: {
            receiverInfo: data.receiverInfo
          },
        });
    },


  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }

};
