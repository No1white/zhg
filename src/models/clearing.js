/*
 * @Author: your name
 * @Date: 2021-02-12 19:46:50
 * @LastEditTime: 2021-02-24 19:13:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\clearing.js
 */
import {
  sendPayRequest,
  trans,
  getUserGoods,
  createOrder,
  success,
  getAddress,
  goToPay,
} from '../services/clearing'
const initState = {
  userGoodList: [], // 当前用户上架的商品列表
  addressInfo: {}, //地址信息
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

    },

    *getAddress({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getAddress, reqParams);
      yield put({
        type: 'save',
        payload: {
          addressInfo: data.addressInfo
        },
      });
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
    *success({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(success, reqParams);
      yield put({
          type: 'save',
          payload: {
            userGoodList: data.userGoodList,
          },
        });
    },
    *goToPay({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(goToPay, reqParams);
      callback(data)
      // yield put({
      //     type: 'save',
      //     payload: {
      //       userGoodList: data.userGoodList,
      //     },
      //   });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    userGoodCheck(state,action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.userGoodList = action.payload.userGoodList;
      return newState;
    }
  },

};
