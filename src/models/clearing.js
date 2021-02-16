/*
 * @Author: your name
 * @Date: 2021-02-12 19:46:50
 * @LastEditTime: 2021-02-16 18:58:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\clearing.js
 */
import {
  sendPayRequest,
  trans,
  getUserGoods,
  createOrder,
} from '../services/clearing'
const initState = {
  userGoodList: []
}
export default {

  namespace: 'clearing',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *sendPayRequest({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(sendPayRequest, reqParams);
      console.log(data);
      // yield put({
        //   type: 'save',
        //   payload: {
        //     hotList: data.list
        //   },
        // });
    },
    *trans({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(trans, reqParams);
      callback(data);
      // yield put({
        //   type: 'save',
        //   payload: {
        //     hotList: data.list
        //   },
        // });
    },
    *createOrder({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(createOrder, reqParams);
      callback(data);
      // yield put({
        //   type: 'save',
        //   payload: {
        //     hotList: data.list
        //   },
        // });
    },
    *getUserGoods({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getUserGoods, reqParams);
      yield put({
          type: 'save',
          payload: {
            userGoodList: data.userGoodList,
          },
        });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    userGoodCheck(state,action) {
      const newState = JSON.parse(JSON.stringify(state));
      console.log(state);
      console.log(action);
      newState.userGoodList = action.payload.userGoodList;
      console.log(newState);
      return newState;
    }
  },

};
