/*
 * @Author: your name
 * @Date: 2020-12-28 17:42:14
 * @LastEditTime: 2021-02-01 18:39:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\home.js
 */
import {
  getHotSale,
  getCommodityList,
  getHotWords
} from '../services/home'
const initState = {
  hotList: [],
  commodityList: [],
  hotWords:[],
}
export default {

  namespace: 'home',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getHotList({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getHotSale, reqParams);
        yield put({
          type: 'save',
          payload: {
            hotList: data.list
          },
        });
    },
    *getCommodityList({ payload }, { call, put,select}) {
      const reqParams = payload || {};
      const { data } = yield call(getCommodityList, reqParams);
      const thisData1 = yield select(state => state.home);
      const oldList = thisData1.commodityList;
        if(payload.category === thisData1.category) {
          yield put({
            type: 'save',
            payload: {
              category: payload.category,
              commodityList: [...oldList,...data.list],
              commodityListLoading: data.hasMore,
              commodityListHasMore: data.hasMore,
            },
          });
        } else {
          yield put({
            type: 'save',
            payload: {
              category: payload.category,
              commodityList: data.list,
              commodityListLoading: data.hasMore,
              commodityListHasMore: data.hasMore,
            },
          });
        }

    },
    *getHotWords({ payload }, { call, put,select}) {
      const reqParams = payload || {};
      const { data } = yield call(getHotWords, reqParams);
        yield put({
          type: 'save',
          payload: {
            hotWords: data.list,
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
