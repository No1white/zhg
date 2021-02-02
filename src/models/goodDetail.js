/*
 * @Author: your name
 * @Date: 2021-02-02 20:26:58
 * @LastEditTime: 2021-02-02 20:56:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\goodDetail.js
 */
/*
 * @Author: your name
 * @Date: 2020-12-28 17:42:14
 * @LastEditTime: 2021-02-01 18:39:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\home.js
 */
import {
  getGoodDetailInfo
} from '../services/goodDetail'
const initState = {
  goodDetailInfo: {}
}
export default {

  namespace: 'goodDetail',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getGoodDetailInfo({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getGoodDetailInfo, reqParams);
        yield put({
          type: 'save',
          payload: {
            goodDetailInfo:data.goodDetailInfo
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
