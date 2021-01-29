/*
 * @Author: your name
 * @Date: 2021-01-24 19:54:33
 * @LastEditTime: 2021-01-29 21:31:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\sale.js
 */
import {
  publishGood,
} from '../services/sale'
const initState = {
}
export default {

  namespace: 'sale',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *publishGood({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      console.log('3');
      console.log(payload);
      const { data } = yield call(publishGood, reqParams);
      // callback(data);
      // console.log(data);
      //   yield put({
      //     type: 'save',
      //     payload: {
      //       hotList: data.list
      //     },
      //   });
    },

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }

};
