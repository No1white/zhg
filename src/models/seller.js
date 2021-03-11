/*
 * @Author: your name
 * @Date: 2021-02-12 19:46:50
 * @LastEditTime: 2021-03-07 19:22:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\clearing.js
 */
import {
  getSellerInfo,
} from '../services/seller'
const initState = {
  userInfo: {},
  goodList: [],
}
export default {

  namespace: 'seller',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getSellerInfo({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getSellerInfo, reqParams);
      yield put({
          type: 'save',
          payload: {
            userInfo: data.userData.userInfo,
            goodList: data.userData.goodList
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
      newState.userGoodList = action.payload.userGoodList;
      return newState;
    }
  },

};
