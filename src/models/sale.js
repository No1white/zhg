/*
 * @Author: your name
 * @Date: 2021-01-24 19:54:33
 * @LastEditTime: 2021-01-31 21:09:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\sale.js
 */
import {
  publishGood,
  editPublishGood
} from '../services/sale'
const initState = {
  BASE_URL: 'http://qn2pi0q2o.hn-bkt.clouddn.com/'
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
      const { data } = yield call(publishGood, reqParams);
      callback(data);
      console.log(data);
        // yield put({
        //   type: 'save',
        //   payload: {
        //     hotList: data.list
        //   },
        // });
    },
    *editPublishGood({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      console.log(payload);
      const { data } = yield call(editPublishGood, reqParams);
      callback(data);

        // yield put({
        //   type: 'save',
        //   payload: {
        //     hotList: data.list
        //   },
        // });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }

};
