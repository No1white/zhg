/*
 * @Author: your name
 * @Date: 2020-12-28 17:42:14
 * @LastEditTime: 2021-03-02 18:47:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\home.js
 */
import {
  getHotSale,
  getCommodityList,
  getHotWords,
  filterGoodList,
  reFound,
} from '../services/home'
const initState = {
  hotList: [],
  commodityList: [],
  hotWords:[],
  commodityListParams: {},
  searchCommodityList: [],
  searchCommodityParams: {},
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
      const oldParams = thisData1.commodityListParams;
      if(oldParams.page === reqParams.page && oldParams.category === reqParams.category) {
        return ;
      }
        if(payload.category === thisData1.category) {
          yield put({
            type: 'save',
            payload: {
              category: payload.category,
              commodityList: [...oldList,...data.list],
              commodityListLoading: data.hasMore,
              commodityListHasMore: data.hasMore,
              commodityListParams: reqParams,
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
              commodityListParams: reqParams,
            },
          });
        }

    },

    *filterGoodList({ payload }, { call, put,select}) {
      const reqParams = payload || {};
      const { data } = yield call(filterGoodList, reqParams);
      // console.log(data);
      const thisData1 = yield select(state => state.home);
      const oldList = thisData1.searchCommodityList;
      const oldParams = thisData1.searchCommodityParams;
      // 换页逻辑处理
      if(oldParams && oldParams.page !== reqParams.page) {
        yield put({
          type: 'save',
          payload: {
            searchCommodityList: [...oldList,...data.list],
            searchCommodityListLoading: data.hasMore,
            searchCommodityListHasMore: data.hasMore,
            searchCommodityParams:reqParams,
          },
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            searchCommodityList: data.list,
            searchCommodityListLoading: data.hasMore,
            searchCommodityListHasMore: data.hasMore,
            searchCommodityParams:reqParams,
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
    *reFound({ payload,callback}, { call, put,select}) {
      const reqParams = payload || {};
      const { data } = yield call(reFound, reqParams);
      callback(data)
        // yield put({
        //   type: 'save',
        //   payload: {
        //     hotWords: data.list,
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
